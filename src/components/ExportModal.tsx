import React, { useState } from 'react';
import { X, FolderDown, FileCode, CheckCircle2, AlertCircle, Info, ExternalLink, HelpCircle, Laptop } from 'lucide-react';
import JSZip from 'jszip';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const filesToExport = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    'src/main.tsx',
    'src/index.css',
    'src/types.ts',
    'src/data.ts',
    'src/App.tsx',
    'src/components/Navbar.tsx',
    'src/components/Footer.tsx',
    'src/components/Hero.tsx',
    'src/components/ProductCard.tsx',
    'src/components/CartDrawer.tsx',
    'src/components/CheckoutForm.tsx',
    'src/components/OrderTracking.tsx',
    'src/components/SkinQuiz.tsx',
    'src/components/ProductDetailsModal.tsx',
    'src/components/ExportModal.tsx'
  ];

  const handleZipExport = async () => {
    setIsExporting(true);
    setErrorMsg(null);
    setExportProgress(5);
    setExportStatus('جاري تهيئة خادم التصدير وبناء ملف الأرشيف الخاص بمستحضرات Silk& velevt...');

    const zip = new JSZip();

    try {
      let completedCount = 0;
      for (const filePath of filesToExport) {
        setExportStatus(`جاري جلب وقراءة ملف الكود المصدري: ${filePath}`);
        
        // Vite webserver serves raw source files at their path in development
        const response = await fetch('/' + filePath);
        if (!response.ok) {
          throw new Error(`تعذر قراءة الملف المصدري للتصدير: ${filePath}`);
        }
        
        const content = await response.text();
        zip.file(filePath, content);
        
        completedCount++;
        const progressPercentage = Math.round((completedCount / filesToExport.length) * 85);
        setExportProgress(progressPercentage + 5);
      }

      setExportStatus('جاري ضغط وهيكلة مجلدات المشروع بنظام الحماية الفاخر...');
      setExportProgress(92);

      const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        // Adjust final progress if metadata updates
      });

      setExportProgress(100);
      setExportStatus('اكتمل التصدير بنجاح! يتم الآن توجيه التنزيل الفوري...');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `silk-velvet-luxury-codebase.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Reset exporting state after successful trigger
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus('');
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'عذراً، حدث خطأ أثناء تجميع ملفات الأوردر وضغط الكود.');
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleSingleFileDownload = async (filePath: string, displayName: string) => {
    try {
      const response = await fetch('/' + filePath);
      if (!response.ok) throw new Error('تعذر جلب ملف الكود المصدري.');
      
      const content = await response.text();
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = displayName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('تعذر تحميل الملف الفردي المختار.');
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans text-right rtl">
      <div className="relative w-full max-w-2xl bg-luxury-beige rounded-2xl border border-luxury-gold/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-luxury-gold text-luxury-charcoal flex justify-between items-center border-b border-luxury-gold-hover/30">
          <button 
            onClick={onClose} 
            className="p-1 px-2.5 rounded-full bg-luxury-charcoal/10 hover:bg-luxury-charcoal/20 text-luxury-charcoal transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold font-serif">📦 تصدير وتحميل مشروع Silk& velevt</h3>
            <p className="text-[11px] text-luxury-charcoal/80 mt-0.5">تحميل الكود المصدري بصيغة ملف مضغوط لتشغيله في أي بيئة عمل محلية</p>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-luxury-charcoal">
          
          {/* Method 1: Interactive client zipper */}
          <div className="bg-white border border-luxury-gold/20 rounded-xl p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-luxury-beige rounded-full text-luxury-gold self-start">
                <FolderDown className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-xs bg-luxury-gold text-luxury-charcoal font-bold px-2.5 py-0.5 rounded-full">الخيار الأول (الموصى به)</span>
                <h4 className="text-base font-bold text-luxury-charcoal">تصدير فوري وتنزيل ZIP مباشرة</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  يقوم هذا الخيار بجمع كافة وتحديثات الكود للمشروع وضغطها بالكامل مع الإعدادات الفاخرة المعتمدة وتنزيلها كملف مضغوط واحد يدعم مستعرضك.
                </p>
                
                {/* Progress indicators */}
                {isExporting && (
                  <div className="mt-4 space-y-2 bg-luxury-beige/40 p-3 rounded-lg border border-luxury-gold/10">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-luxury-blue font-bold">{exportProgress}%</span>
                      <span className="text-[11px] text-stone-600 animate-pulse">{exportStatus}</span>
                    </div>
                    <div className="w-full bg-stone-250 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-luxury-gold h-full transition-all duration-300 rounded-full"
                        style={{ width: `${exportProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {errorMsg && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-150 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleZipExport}
                    disabled={isExporting}
                    className="w-full py-3 bg-luxury-gold hover:bg-luxury-gold-hover text-luxury-charcoal font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <FolderDown className="w-4 h-4" />
                    <span>{isExporting ? 'جاري تجميع الملفات والضغط...' : 'إنشاء وتنزيل ملف الكود مضغوطاً (.ZIP)'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Method 2: Instructions for Native Workspace Export */}
          <div className="bg-white border border-luxury-gold/20 rounded-xl p-5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-luxury-beige rounded-full text-luxury-gold self-start">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="text-xs bg-luxury-charcoal text-white font-bold px-2.5 py-0.5 rounded-full">الخيار الثاني</span>
                <h4 className="text-base font-bold text-luxury-charcoal">طريقة التصدير الرسمية المدمجة في Google AI Studio</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  تتميز مساحة عمل وموقع <strong>Google AI Studio</strong> بوجود محرك تصدير شامل مدمج. يمكنك استخدامه لتحميل المشروع كقالب كامل أو ترحيله تلقائياً لـ GitHub:
                </p>
                <div className="mt-3 bg-luxury-beige/30 p-3.5 rounded-lg border border-luxury-gold/10 text-xs leading-relaxed text-stone-600 space-y-2">
                  <p>1️⃣ انظري إلى <strong>أعلى يمين شاشة المتصفح</strong> في شريط الأدوات الرئيسي لموقع Google AI Studio.</p>
                  <p>2️⃣ ستجدين زر أو قائمة تسمى <strong>Share</strong> أو <strong>Export</strong> أو <strong>Settings (⚙️)</strong>.</p>
                  <p>3️⃣ اضغطي عليها، واختاري التصدير كـ <strong>ZIP</strong> أو <strong>Export to GitHub</strong> لحفظ مجلدات المشروع بالكامل ببيئة العمل الحالية بنقرة زر.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Single File Downloads */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-luxury-charcoal">📄 تحميل ملفات الأكواد الفردية (الأكثر تخصصاً):</h4>
            <p className="text-xs text-stone-500">إذا كنتِ مهتمة بالملفات والوثائق الفردية المخصصة التي تم ابتكارها، يمكنكِ تنزيلها مباشرة:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleSingleFileDownload('src/App.tsx', 'App.tsx')}
                className="flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-luxury-gold text-xs font-bold rounded-lg hover:bg-stone-50 transition-colors cursor-pointer text-right"
              >
                <FileCode className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>سجل المبيعات والتخطيط (App.tsx)</span>
              </button>
              <button
                onClick={() => handleSingleFileDownload('src/data.ts', 'data.ts')}
                className="flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-luxury-gold text-xs font-bold rounded-lg hover:bg-stone-50 transition-colors cursor-pointer text-right"
              >
                <FileCode className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>قاعدة مستحضرات الجمال وعروض الذهبي (data.ts)</span>
              </button>
              <button
                onClick={() => handleSingleFileDownload('src/index.css', 'index.css')}
                className="flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-luxury-gold text-xs font-bold rounded-lg hover:bg-stone-50 transition-colors cursor-pointer text-right"
              >
                <FileCode className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>توزيع ألوان الفخامة الباهية والبيج (index.css)</span>
              </button>
              <button
                onClick={() => handleSingleFileDownload('src/components/CheckoutForm.tsx', 'CheckoutForm.tsx')}
                className="flex items-center justify-between p-2.5 bg-white border border-stone-200 hover:border-luxury-gold text-xs font-bold rounded-lg hover:bg-stone-50 transition-colors cursor-pointer text-right"
              >
                <FileCode className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>شحن وتثبيت فواتير ١٠٠ج (CheckoutForm.tsx)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-luxury-beige border-t border-luxury-gold-hover/20 text-center text-[10px] text-stone-500">
          متجر Silk& velevt الفاخر لمستحضرات التجميل والعناية بالمرأة العربية.
        </div>

      </div>
    </div>
  );
}
