
import React, { useState } from 'react';
import Layout from './components/Layout';
import MusicPlayer from './components/MusicPlayer';
import AIChat from './components/AIChat';
import { View, Grade, VocabularyItem, Quiz, Lesson } from './types';
import { GRAMMAR_TENSES, MOCK_VOCABULARY, MOCK_QUIZZES } from './constants';
// Added ClipboardList to imports to fix missing component error
import { Book, CheckCircle, GraduationCap, ArrowRight, Star, Volume2, Info, Languages, Send, Loader2, Sparkles, Copy, Trash2, ClipboardList } from 'lucide-react';
import { translateText } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [grade, setGrade] = useState<Grade>(12);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activeGrammar, setActiveGrammar] = useState<Lesson | null>(null);
  const [quizResults, setQuizResults] = useState<Record<string, number>>({});
  
  // Translation State
  const [transInput, setTransInput] = useState('');
  const [transOutput, setTransOutput] = useState('');
  const [transLoading, setTransLoading] = useState(false);
  const [transDir, setTransDir] = useState<'en-vi' | 'vi-en'>('en-vi');

  const handleStartQuiz = (q: Quiz) => {
    setActiveQuiz(q);
    setView('quizzes');
    setQuizResults({});
  };

  const handleGrammarDetail = (lesson: Lesson) => {
    setActiveGrammar(lesson);
    setView('grammar-detail');
  };

  const handleTranslate = async () => {
    if (!transInput.trim()) return;
    setTransLoading(true);
    const result = await translateText(transInput, transDir);
    setTransOutput(result);
    setTransLoading(false);
  };

  const renderHome = () => (
    <div className="space-y-8 animate-fadeIn">
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4 backdrop-blur-md">
            <Sparkles size={14} /> DÀNH RIÊNG CHO LỚP {grade}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Chinh phục tiếng Anh <br/> thật dễ dàng!</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl leading-relaxed">
            Nền tảng học tập toàn diện tích hợp AI giúp bạn vững kiến thức ngữ pháp, giàu vốn từ vựng và tự tin trong các kỳ thi.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setView('lessons')} className="bg-white text-indigo-600 px-8 py-3 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95">
              Học ngay <ArrowRight size={20} />
            </button>
            <button onClick={() => setView('translation')} className="bg-indigo-500/50 backdrop-blur-md text-white px-8 py-3 rounded-2xl font-bold border border-white/30 hover:bg-indigo-400 transition-all flex items-center gap-2">
              <Languages size={20} /> Dịch thuật AI
            </button>
          </div>
        </div>
        <GraduationCap className="absolute -bottom-10 -right-10 text-white/10 w-80 h-80 rotate-12" />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Book className="text-blue-500" />} 
          title="12 Thì cơ bản" 
          desc="Nắm vững cấu trúc, cách dùng và bài tập vận dụng cho 12 thì."
          onClick={() => setView('lessons')}
        />
        <FeatureCard 
          icon={<Star className="text-yellow-500" />} 
          title="Từ vựng cốt lõi" 
          desc="Học từ vựng theo chủ đề sát với chương trình giáo dục."
          onClick={() => setView('vocabulary')}
        />
        <FeatureCard 
          icon={<CheckCircle className="text-green-500" />} 
          title="Luyện đề thi" 
          desc="Đầy đủ đề thi giữa kỳ, cuối kỳ và tốt nghiệp THPT."
          onClick={() => setView('quizzes')}
        />
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Star className="text-yellow-400 fill-current" /> Đề xuất kiểm tra (Lớp {grade})
          </h3>
          <button onClick={() => setView('quizzes')} className="text-indigo-600 text-sm font-bold hover:underline">Xem tất cả</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_QUIZZES.filter(q => q.grade === grade).map(q => (
            <div key={q.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4 group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {q.type[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{q.title}</h4>
                  <p className="text-gray-500 text-sm">{q.questions.length} câu hỏi • Lớp {q.grade}</p>
                </div>
              </div>
              <button onClick={() => handleStartQuiz(q)} className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">12 Thì trong tiếng Anh</h2>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Cơ bản & Nâng cao</div>
      </div>
      <p className="text-gray-500">Học sinh lớp {grade} cần nắm vững các thì sau đây để đạt điểm cao trong kỳ thi.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(GRAMMAR_TENSES).map((lesson) => (
          <div 
            key={lesson.id} 
            onClick={() => handleGrammarDetail(lesson)}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group cursor-pointer flex flex-col h-full"
          >
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {lesson.id}
            </div>
            <h4 className="font-bold text-xl mb-3 group-hover:text-indigo-600 transition-colors">{lesson.title}</h4>
            <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">{lesson.content}</p>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold uppercase tracking-tighter">
              Bắt đầu học <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGrammarDetail = () => {
    if (!activeGrammar) return null;
    return (
      <div className="space-y-8 animate-fadeIn">
        <button onClick={() => setView('lessons')} className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
          <ArrowRight className="rotate-180" size={20} /> Quay lại danh sách
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-indigo-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{activeGrammar.title}</h2>
            <p className="text-indigo-100 opacity-90">{activeGrammar.content}</p>
          </div>
          
          <div className="p-8 space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <Info size={22} className="text-indigo-600" /> Cấu trúc (Formula)
              </h3>
              <div className="bg-slate-900 text-white p-6 rounded-2xl font-mono text-xl shadow-inner text-center">
                {activeGrammar.formula}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <CheckCircle size={22} className="text-green-600" /> Cách dùng (Usage)
                </h3>
                <ul className="space-y-3">
                  {activeGrammar.usage?.map((u, i) => (
                    <li key={i} className="flex gap-3 text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</div>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                  <Star size={22} className="text-yellow-600" /> Ví dụ (Examples)
                </h3>
                <div className="space-y-3">
                  {activeGrammar.examples?.map((ex, i) => (
                    <div key={i} className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl text-gray-700 italic">
                      "{ex}"
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold mb-2">Bạn đã hiểu bài chưa?</h4>
            <p className="text-indigo-300">Hãy làm bài kiểm tra nhanh để ôn tập lại kiến thức vừa học.</p>
          </div>
          <button onClick={() => setView('quizzes')} className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg whitespace-nowrap">
            Luyện tập ngay
          </button>
        </div>
      </div>
    )
  };

  const renderTranslation = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dịch thuật AI</h2>
        <div className="flex items-center gap-2 bg-indigo-100 p-1 rounded-xl">
          <button 
            onClick={() => setTransDir('en-vi')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${transDir === 'en-vi' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-400'}`}
          >
            EN → VI
          </button>
          <button 
            onClick={() => setTransDir('vi-en')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${transDir === 'vi-en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-400'}`}
          >
            VI → EN
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{transDir === 'en-vi' ? 'Tiếng Anh' : 'Tiếng Việt'}</span>
            <button onClick={() => setTransInput('')} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
          </div>
          <textarea 
            value={transInput}
            onChange={(e) => setTransInput(e.target.value)}
            placeholder="Nhập văn bản cần dịch..."
            className="flex-1 resize-none bg-transparent outline-none text-lg text-gray-800 placeholder:text-gray-300"
          />
          <button 
            onClick={handleTranslate}
            disabled={transLoading || !transInput.trim()}
            className="mt-4 w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {transLoading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Dịch ngay</>}
          </button>
        </div>

        <div className="bg-indigo-50 rounded-3xl p-6 shadow-inner border border-indigo-100 flex flex-col h-80 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{transDir === 'en-vi' ? 'Tiếng Việt' : 'Tiếng Anh'}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(transOutput)}
              className="text-indigo-300 hover:text-indigo-600 transition-colors"
            >
              <Copy size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto text-lg text-indigo-900">
            {transOutput || <span className="text-indigo-200">Kết quả dịch sẽ xuất hiện tại đây...</span>}
          </div>
          {transLoading && <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded-3xl">
             <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
                <span className="text-indigo-600 font-bold text-sm">AI đang xử lý...</span>
             </div>
          </div>}
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-3xl border border-gray-100">
        <h4 className="font-bold mb-4 flex items-center gap-2 text-indigo-600">
           <Sparkles size={18} /> Mẹo dịch thuật hiệu quả
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 rounded-2xl bg-slate-50 text-sm text-gray-600 italic">
             "Dịch cả câu giúp AI hiểu rõ ngữ cảnh hơn là dịch từng từ riêng lẻ."
           </div>
           <div className="p-4 rounded-2xl bg-slate-50 text-sm text-gray-600 italic">
             "Sử dụng công cụ dịch để kiểm tra lại cấu trúc ngữ pháp bạn vừa học."
           </div>
           <div className="p-4 rounded-2xl bg-slate-50 text-sm text-gray-600 italic">
             "AI của chúng tôi có khả năng giải thích các thành ngữ phức tạp."
           </div>
        </div>
      </div>
    </div>
  );

  const renderVocabulary = () => {
    const vocabs = MOCK_VOCABULARY[grade] || [];
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
           <h2 className="text-3xl font-bold">Từ vựng Lớp {grade}</h2>
           <button onClick={() => setView('ai-tutor')} className="text-indigo-600 text-sm font-bold flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl">
             <Sparkles size={16} /> Học với AI
           </button>
        </div>
        {vocabs.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <Languages className="text-gray-300" size={40} />
            </div>
            <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">Dữ liệu từ vựng cho khối lớp này đang được các chuyên gia biên soạn...</p>
            <button onClick={() => setView('ai-tutor')} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200">Hỏi Gia sư AI ngay</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vocabs.map((v, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-1">{v.word}</h3>
                    <p className="text-indigo-600 font-bold italic tracking-wide">{v.pronunciation}</p>
                  </div>
                  <button className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Volume2 size={24} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-100">
                    <p className="font-bold text-center">{v.meaning}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-sm text-gray-500 italic leading-relaxed">"{v.example}"</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50/50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderQuizzes = () => {
    if (activeQuiz) {
        const completedCount = Object.keys(quizResults).length;
        const correctCount = Object.entries(quizResults).filter(([id, ans]) => 
            activeQuiz.questions.find(q => q.id === id)?.correctAnswer === ans
        ).length;

        return (
            <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
                <div className="flex items-center justify-between sticky top-0 bg-slate-50 py-4 z-10">
                    <button onClick={() => setActiveQuiz(null)} className="text-gray-500 font-bold flex items-center gap-2 hover:text-indigo-600">
                        <ArrowRight className="rotate-180" size={20} /> Thoát
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-gray-400 uppercase">Tiến độ</p>
                           <p className="font-black text-indigo-600">{completedCount}/{activeQuiz.questions.length}</p>
                        </div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 transition-all duration-500" 
                              style={{ width: `${(completedCount / activeQuiz.questions.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100">
                    <h2 className="text-3xl font-bold mb-10 text-center">{activeQuiz.title}</h2>
                    <div className="space-y-12">
                        {activeQuiz.questions.map((q, idx) => (
                            <div key={q.id} className="space-y-6">
                                <div className="flex gap-4">
                                   <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                                   <p className="font-bold text-xl text-gray-800 leading-snug pt-1">{q.question}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, oIdx) => (
                                        <button 
                                            key={oIdx}
                                            disabled={quizResults[q.id] !== undefined}
                                            onClick={() => setQuizResults({...quizResults, [q.id]: oIdx})}
                                            className={`p-6 text-left rounded-[1.5rem] border-2 transition-all relative ${
                                                quizResults[q.id] === oIdx 
                                                ? (oIdx === q.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                                                : (quizResults[q.id] !== undefined && oIdx === q.correctAnswer ? 'border-green-500 bg-green-50' : 'border-gray-50 hover:border-indigo-200 hover:bg-indigo-50/30')
                                            }`}
                                        >
                                            <span className="font-bold text-indigo-400 mr-3">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                                            {quizResults[q.id] === oIdx && (
                                                <div className="absolute top-2 right-2">
                                                   {oIdx === q.correctAnswer ? <CheckCircle className="text-green-500" size={18} /> : <Info className="text-red-500" size={18} />}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {quizResults[q.id] !== undefined && (
                                    <div className={`p-6 rounded-3xl flex gap-4 animate-slideIn ${quizResults[q.id] === q.correctAnswer ? 'bg-green-100/50 border border-green-200' : 'bg-red-100/50 border border-red-200'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${quizResults[q.id] === q.correctAnswer ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-1">{quizResults[q.id] === q.correctAnswer ? 'Tuyệt vời!' : 'Hơi tiếc một chút...'}</p>
                                            <p className="text-sm opacity-80 leading-relaxed">{q.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {completedCount === activeQuiz.questions.length && (
                        <div className="mt-16 p-8 bg-indigo-600 rounded-3xl text-white text-center animate-bounceIn">
                           <h3 className="text-3xl font-black mb-2">Hoàn thành!</h3>
                           <p className="text-indigo-100 mb-6 text-lg">Bạn đạt được {correctCount}/{activeQuiz.questions.length} điểm.</p>
                           <button onClick={() => setActiveQuiz(null)} className="bg-white text-indigo-600 px-10 py-3 rounded-2xl font-bold shadow-xl">
                              Quay lại danh sách
                           </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Thư viện Đề thi</h2>
            <div className="text-sm font-bold text-gray-400">LỚP {grade}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_QUIZZES.filter(q => q.grade === grade).map(q => (
                <div key={q.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            q.type === 'midterm' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                            {q.type === 'midterm' ? 'Giữa kỳ' : 'Luyện tập'}
                        </div>
                        {/* Fixed: ClipboardList component used correctly after import fix */}
                        <ClipboardList className="text-gray-200 group-hover:text-indigo-100 transition-colors" size={32} />
                    </div>
                    <h4 className="font-bold text-2xl mb-2 group-hover:text-indigo-600 transition-colors">{q.title}</h4>
                    <p className="text-gray-500 mb-8 flex items-center gap-2"><CheckCircle size={16} /> {q.questions.length} câu hỏi trắc nghiệm</p>
                    <button onClick={() => handleStartQuiz(q)} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 hover:scale-[1.02] active:scale-95">
                        Bắt đầu làm bài
                    </button>
                </div>
            ))}
            {MOCK_QUIZZES.filter(q => q.grade === grade).length === 0 && (
                <div className="col-span-full bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        {/* Fixed: ClipboardList component used correctly after import fix */}
                        <ClipboardList className="text-gray-200" size={40} />
                    </div>
                    <p className="text-gray-500 text-lg">Chưa có đề thi cho lớp này. Hãy thử chọn lớp khác!</p>
                </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <Layout activeView={view} setView={setView} selectedGrade={grade} setGrade={setGrade}>
      {view === 'home' && renderHome()}
      {view === 'lessons' && renderLessons()}
      {view === 'vocabulary' && renderVocabulary()}
      {view === 'quizzes' && renderQuizzes()}
      {view === 'translation' && renderTranslation()}
      {view === 'grammar-detail' && renderGrammarDetail()}
      
      <MusicPlayer />
      <AIChat grade={grade} />
    </Layout>
  );
};

const FeatureCard = ({ icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) => (
  <div onClick={onClick} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group">
    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h4 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{title}</h4>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;
