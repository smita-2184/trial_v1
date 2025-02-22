import React, { useState, useRef, useEffect } from 'react';
import { useOpenAIStore } from '../store/openai';
import { Upload, SendHorizontal, RefreshCw, Download, FileText, X, ChevronRight, Image, FileOutput, Activity } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Chat } from './Chat';
import Plot from 'react-plotly.js';

interface SpectroscopicData {
  type: 'NMR' | 'HMR' | 'IR' | 'UV-Vis' | 'Mass' | 'Crystallography' | 'Fluorescence';
  data: number[][];
  metadata?: {
    instrument?: string;
    solvent?: string;
    frequency?: number;
    temperature?: number;
    crystalSystem?: string;
    spaceGroup?: string;
    excitationWavelength?: number;
    emissionWavelength?: number;
    resolution?: number;
    acquisitionTime?: number;
    pulseSequence?: string;
    relaxationDelay?: number;
    scanCount?: number;
    magneticField?: number;
    couplingConstants?: number[];
    chemicalShifts?: number[];
  };
  peakAssignments?: {
    position: number;
    intensity: number;
    multiplicity?: string;
    coupling?: number;
    assignment?: string;
    confidence: number;
  }[];
  structuralFeatures?: {
    type: string;
    probability: number;
    description: string;
    relatedPeaks: number[];
  }[];
  processingHistory?: {
    timestamp: number;
    operation: string;
    parameters: Record<string, any>;
  }[];
}

export function SpectroscopicAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<SpectroscopicData | null>(null);
  const [showChat, setShowChat] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [peaks, setPeaks] = useState<{ x: number; y: number; text: string }[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [dataTable, setDataTable] = useState<{ x: number; y: number; peak?: boolean }[]>([]);
  const [peakData, setPeakData] = useState<{ position: number; intensity: number; assignment?: string }[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['metadata', 'peaks']);
  const [activeTab, setActiveTab] = useState<'spectrum' | 'chat'>('spectrum');
  const service = useOpenAIStore((state) => state.service);
  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Handle pasted images
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            onDrop([file]);
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Reset states
    setValidationError(null);
    setError(null);
    setPeaks([]);
    setAnalysis('');
    setDataTable([]);
    setPeakData([]);
    
    setFile(file);
    setLoading(true);

    try {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size too large. Please upload a file smaller than 10MB.');
      }

      let data: number[][] = [];

      // Handle image files
      if (file.type.startsWith('image/')) {
        data = await processImageData(file);
      } else {
        const text = await readFileAsText(file);
        
        if (file.name.endsWith('.jdx') || file.name.endsWith('.dx')) {
          data = parseJCAMPDX(text);
        } else if (file.name.endsWith('.csv')) {
          data = parseCSV(text);
        } else {
          throw new Error('Unsupported file format. Please upload a JCAMP-DX (.jdx, .dx), CSV, or image file.');
        }
      }

      setProcessedData({
        type: determineSpectrumType(file.name),
        data
      });
      
      // Validate data points
      if (data.length < 10) {
        setValidationError('Not enough data points for analysis. Please check your file.');
        return;
      }

      // Process data for table
      const tableData = data.map(([x, y]) => ({ x, y }));
      setDataTable(tableData);

      const foundPeaks = findPeaks(data);
      setPeakData(foundPeaks);

      await analyzeSpectrum(data);
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setLoading(false);
    }
  };

  const readFileAsText = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const processImageData = (file: File): Promise<number[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx || !canvas) {
              throw new Error('Could not create canvas context');
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            if (imageData.data.length === 0) {
              throw new Error('No data found in image. Please check the image file.');
            }
            
            const data: number[][] = [];

            for (let x = 0; x < canvas.width; x++) {
              let totalIntensity = 0;
              for (let y = 0; y < canvas.height; y++) {
                const index = (y * canvas.width + x) * 4;
                const intensity = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
                totalIntensity += intensity;
              }
              data.push([x, totalIntensity / canvas.height]);
            }
            
            if (data.length === 0) {
              throw new Error('Failed to extract data from image. Please try a different image.');
            }
            
            resolve(data);
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(img.src);
          reject(new Error('Failed to load image. Please check if the file is a valid image.'));
        };

        img.src = e.target?.result as string;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/x-jcamp-dx': ['.jdx', '.dx'],
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv']
    },
    maxFiles: 1
  });

  const parseJCAMPDX = (text: string): number[][] => {
    const lines = text.split('\n');
    const data: number[][] = [];
    let dataStarted = false;
    
    if (lines.length === 0) {
      throw new Error('Empty JCAMP-DX file. Please check the file content.');
    }
    
    for (const line of lines) {
      if (line.startsWith('##XYDATA=')) {
        dataStarted = true;
        continue;
      }
      
      if (dataStarted && !line.startsWith('##')) {
        const values = line.trim().split(/\s+/).map(Number);
        if (values.length === 2 && !values.some(isNaN)) {
          data.push(values);
        }
      }
    }

    if (data.length === 0) {
      throw new Error('No valid data found in JCAMP-DX file. Please check the file format.');
    }

    return data;
  };

  const parseCSV = (text: string): number[][] => {
    return text
      .split('\n')
      .map(line => {
        const values = line.split(',').map(Number);
        if (values.length !== 2) {
          throw new Error('Invalid CSV format. Each line must contain exactly two numbers (x,y).');
        }
        return values;
      })
      .filter(row => row.length === 2 && !row.some(isNaN));
  };

  const determineSpectrumType = (filename: string): SpectroscopicData['type'] => {
    filename = filename.toLowerCase();
    if (filename.includes('nmr')) return 'NMR';
    if (filename.includes('ir') || filename.includes('infrared')) return 'IR';
    if (filename.includes('uv') || filename.includes('vis')) return 'UV-Vis';
    if (filename.includes('ms') || filename.includes('mass')) return 'Mass';
    return 'NMR';
  };

  const analyzeSpectrum = async (data: number[][]) => {
    if (!service || !data || data.length === 0) return;
    
    const sampledData = sampleData(data, 1000);
    
    try {
      const prompt = `Analyze this spectroscopic data and provide a detailed report. Data points: ${JSON.stringify(sampledData)}\n\nPlease provide analysis in the following format:\n1. Peak Identification\n2. Structural Features\n3. Possible Molecular Components\n4. Quality Assessment\n5. Recommendations`;

      const response = await service.generateResponse(prompt);
      setAnalysis(response);

      // Update plot with identified peaks
      const plotData = [
        {
          x: data.map(point => point[0]),
          y: data.map(point => point[1]),
          type: 'scatter',
          mode: 'lines',
          name: 'Spectrum',
          line: { color: '#4299E1' }
        },
        {
          x: peakData.map(peak => peak.position),
          y: peakData.map(peak => peak.intensity),
          type: 'scatter',
          mode: 'markers+text',
          name: 'Peaks',
          text: peakData.map((_, i) => `Peak ${i + 1}`),
          textposition: 'top center',
          marker: { size: 8, color: '#F56565' }
        }
      ];

      const layout = {
        title: 'Spectroscopic Analysis',
        plot_bgcolor: '#1A202C',
        paper_bgcolor: '#1A202C',
        font: { color: '#E2E8F0' },
        xaxis: {
          title: 'Position',
          gridcolor: '#2D3748',
          zerolinecolor: '#2D3748'
        },
        yaxis: {
          title: 'Intensity',
          gridcolor: '#2D3748',
          zerolinecolor: '#2D3748'
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          bgcolor: '#2D3748',
          bordercolor: '#4A5568'
        },
        margin: { t: 50, r: 50, b: 50, l: 50 }
      };

      return <Plot data={plotData} layout={layout} style={{ width: '100%', height: '400px' }} />;

    } catch (error) {
      console.error('Failed to analyze spectrum:', error);
      setError('Failed to analyze spectrum. Please try again.');
    }
  };

  const sampleData = (data: number[][], targetPoints: number): number[][] => {
    if (data.length <= targetPoints) return data;
    
    const step = Math.max(1, Math.floor(data.length / targetPoints));
    const sampled: number[][] = [];
    
    for (let i = 0; i < data.length; i += step) {
      sampled.push(data[i]);
    }
    
    return sampled;
  };

  const findPeaks = (data: number[][]): { position: number; intensity: number }[] => {
    const peaks: { position: number; intensity: number }[] = [];
    const windowSize = 5;
    const threshold = 0.1;

    for (let i = windowSize; i < data.length - windowSize; i++) {
      const currentY = data[i][1];
      let isPeak = true;

      // Check if current point is higher than surrounding points
      for (let j = i - windowSize; j <= i + windowSize; j++) {
        if (j !== i && data[j][1] >= currentY) {
          isPeak = false;
          break;
        }
      }

      // Check if peak is significant (above threshold)
      if (isPeak && currentY > threshold) {
        peaks.push({
          position: data[i][0],
          intensity: currentY
        });
      }
    }

    return peaks;
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('spectrum')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'spectrum' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Spectrum Analysis
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            AI Assistant
          </button>
        </div>

        {activeTab === 'spectrum' ? (
          <>
            {/* File Upload Section */}
            <div {...getRootProps()} className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input {...getInputProps()} />
              <p className="text-gray-300">Drag & drop a spectroscopic data file here, or click to select</p>
              <p className="text-sm text-gray-500 mt-2">Supported formats: JCAMP-DX (.jdx, .dx), CSV, or spectral images</p>
            </div>

            {/* Error Display */}
            {(error || validationError) && (
              <div className="bg-red-900/50 text-red-200 p-4 rounded-lg">
                {error || validationError}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-4">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="ml-2">Processing data...</span>
              </div>
            )}

            {/* Results Section */}
            {processedData && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setExpandedSections(['metadata', 'peaks', 'analysis'])}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setExpandedSections([])}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Collapse All
                  </button>
                </div>

                {/* Spectrum Plot */}
                <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Spectrum Visualization</h3>
                  <Plot
                    data={[/* ... existing plot data ... */]}
                    layout={{/* ... existing layout ... */}}
                    style={{ width: '100%', height: '400px' }}
                  />
                </div>

                {/* Analysis Sections */}
                <div className="space-y-4">
                  {/* Metadata Section */}
                  <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-200">
                    <button
                      onClick={() => toggleSection('metadata')}
                      className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold">Metadata</h3>
                      <ChevronRight
                        className={`w-5 h-5 transform transition-transform ${expandedSections.includes('metadata') ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {expandedSections.includes('metadata') && processedData.metadata && (
                      <div className="mt-4 space-y-2 p-4 bg-gray-700/50 rounded-lg">
                        <p><span className="font-semibold">Type:</span> {processedData.type}</p>
                        <p><span className="font-semibold">Instrument:</span> {processedData.metadata.instrument || 'N/A'}</p>
                        <p><span className="font-semibold">Resolution:</span> {processedData.metadata.resolution || 'N/A'}</p>
                      </div>
                    )}
                  </div>

                  {/* Peak Analysis Section */}
                  <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-200">
                    <button
                      onClick={() => toggleSection('peaks')}
                      className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold">Peak Analysis</h3>
                      <ChevronRight
                        className={`w-5 h-5 transform transition-transform ${expandedSections.includes('peaks') ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {expandedSections.includes('peaks') && (
                      <div className="mt-4 overflow-x-auto p-4 bg-gray-700/50 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-600">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 bg-gray-700">Position</th>
                              <th className="px-4 py-2 bg-gray-700">Intensity</th>
                              <th className="px-4 py-2 bg-gray-700">Assignment</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-600">
                            {peakData.map((peak, index) => (
                              <tr key={index} className="hover:bg-gray-600 transition-colors">
                                <td className="px-4 py-2 text-center">{peak.position.toFixed(2)}</td>
                                <td className="px-4 py-2 text-center">{peak.intensity.toFixed(2)}</td>
                                <td className="px-4 py-2 text-center">{peak.assignment || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <Chat pdfText={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SpectroscopicAnalysis;