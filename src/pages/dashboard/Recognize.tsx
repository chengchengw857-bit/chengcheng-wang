import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, ScanLine, Activity, BookOpen, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { recognizeHerb, RecognitionResult } from '../../services/geminiService';

export default function Recognize() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; type: string; size: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('请上传有效的图片文件 (JPG, PNG等)');
      return;
    }
    
    setError(null);
    setResult(null);
    setFileInfo({ name: file.name, type: file.type, size: file.size });

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const startRecognition = async () => {
    if (!selectedImage || !fileInfo) return;

    setIsRecognizing(true);
    setError(null);
    
    try {
      // Convert base64 to File object for FormData
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const file = new File([blob], fileInfo.name, { type: fileInfo.type });

      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/recognize', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('识别失败');
      const data = await res.json();
      const resultData = JSON.parse(data.result);
      setResult(resultData);
      
      const history = JSON.parse(localStorage.getItem('herbHistory') || '[]');
      history.unshift({
        id: Date.now(),
        image: selectedImage,
        name: resultData.predicted_herb,
        confidence: resultData.probabilities[0]?.probability || 0,
        date: new Date().toISOString(),
      });
      localStorage.setItem('herbHistory', JSON.stringify(history.slice(0, 50)));
      
    } catch (err: any) {
      setError(err.message || '识别失败，请重试或检查网络连接。');
      console.error(err);
    } finally {
      setIsRecognizing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold text-slate-800">中草药识别工作台</h1>
        <p className="text-sm text-slate-500">上传中草药图片，系统将自动进行深度识别与药理分析</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        {/* Left Column - Upload & Preview */}
        <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              上传药材图像
            </h2>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400 hover:bg-slate-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*" 
                capture="environment"
                className="hidden" 
              />
              
              {selectedImage ? (
                <div className="relative aspect-square w-full mx-auto rounded-lg overflow-hidden shadow-sm border border-slate-200">
                  <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                      点击更换图片
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1 text-sm">点击或拖拽图片到此处</p>
                  <p className="text-slate-400 text-xs">支持 JPG, PNG 格式</p>
                </div>
              )}
            </div>

            {fileInfo && (
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 overflow-hidden">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-700 truncate">{fileInfo.name}</p>
                    <p className="text-xs text-slate-500">{formatSize(fileInfo.size)}</p>
                  </div>
                </div>
                {selectedImage && !isRecognizing && !result && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); startRecognition(); }}
                    className="w-full bg-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <ScanLine className="w-4 h-4" />
                    开始深度识别
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2 border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}
            
            {isRecognizing && (
              <div className="mt-4 p-4 bg-emerald-50 text-emerald-700 rounded-xl flex flex-col items-center justify-center gap-3 border border-emerald-100 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                <div className="space-y-1">
                  <p className="font-medium text-sm">AI 正在深度分析图像特征...</p>
                  <p className="text-xs text-emerald-600/70">正在检索药理数据库与配伍应用</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-8 min-h-0">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 shrink-0">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    识别结果: <span className="text-emerald-600">{result.predicted_herb}</span>
                  </h2>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">AI 置信度</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {((result.probabilities[0]?.probability || 0) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar pb-6">
                  {/* Chart */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <ScanLine className="w-4 h-4" />
                      可能性分布
                    </h3>
                    <div className="h-[180px] w-full bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={result.probabilities.map(p => ({
                            name: p.name,
                            value: parseFloat((p.probability * 100).toFixed(1))
                          }))}
                          layout="vertical"
                          margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 500 }} width={80} />
                          <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number) => [`${value}%`, '概率']}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {result.probabilities.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#cbd5e1'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-500" />
                      充分解释：这是什么药材？
                    </h3>
                    <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100/50">
                      <p className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-wrap">
                        {result.description}
                      </p>
                    </div>
                  </div>

                  {/* Medicinal Properties */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        药性特征
                      </h3>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                        <p className="text-sm"><span className="font-semibold text-slate-600">性味：</span>{result.medicinal_properties.nature}</p>
                        <p className="text-sm"><span className="font-semibold text-slate-600">归经：</span>{result.medicinal_properties.meridians.join(', ')}</p>
                        <p className="text-sm"><span className="font-semibold text-slate-600">功效：</span>{result.medicinal_properties.functions.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Pill className="w-5 h-5 text-emerald-500" />
                        用法用量
                      </h3>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm text-slate-700 leading-relaxed">{result.usage_instructions}</p>
                      </div>
                    </div>
                  </div>

                  {/* Side Effects & Contraindications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        副作用
                      </h3>
                      <ul className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/50 list-disc list-inside space-y-1">
                        {result.side_effects.map((se, idx) => <li key={idx} className="text-sm text-slate-700">{se}</li>)}
                      </ul>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        禁忌
                      </h3>
                      <ul className="bg-red-50/50 p-4 rounded-xl border border-red-100/50 list-disc list-inside space-y-1">
                        {result.contraindications.map((c, idx) => <li key={idx} className="text-sm text-slate-700">{c}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Applications & Combinations */}
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-emerald-500" />
                      治哪些病需要用它？和哪些药材合在一起用？
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.applications?.map((app, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="font-bold text-emerald-700 mb-3 text-base border-b border-emerald-100 pb-2">
                            治疗：{app.disease}
                          </div>
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">常配伍药材</span>
                            <div className="flex flex-wrap gap-2">
                              {app.combinations?.map((herb, hIdx) => (
                                <span key={hIdx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-sm text-slate-700">
                                  {herb}
                                </span>
                              ))}
                              {(!app.combinations || app.combinations.length === 0) && (
                                <span className="text-sm text-slate-400 italic">单方使用或视情况配伍</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 border-dashed h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  <ScanLine className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="text-xl font-medium text-slate-700 mb-3">等待上传与识别</h3>
                <p className="text-slate-500 max-w-md leading-relaxed">
                  请在左侧上传中草药图片，点击"开始深度识别"后，AI 将为您提供：
                  <br/><br/>
                  <span className="inline-block text-left space-y-1">
                    ✅ 药材名称与可能性分布<br/>
                    ✅ 详细的药材来源与性味归经<br/>
                    ✅ 核心功效与主治疾病<br/>
                    ✅ 具体的配伍应用（和什么药材合用治什么病）
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
