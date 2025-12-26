import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, Star, ArrowRight, Plus, Scan, Target, ChevronRight, Maximize2, Share2, Zap, Sparkles, Diamond, PenTool, Quote } from 'lucide-react';

// --- データ定義 ---

const LOOKS = [
  {
    id: 'modern_classic',
    title: '都市の夜を彩る、光の機能美',
    subTitle: 'URBAN ILLUMINATION',
    // ルック全体の提案者（この人が全アイテムをコメントする）
    curator: {
      name: "SAYAKA",
      role: "Fashion Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      shortTitle: "光と影を操る、ドラマティックな夜へ。"
    },
    modelImage: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1600&auto=format&fit=crop',
    description: '伝統的な美意識と、最先端の技術が織りなす調和。都市の喧騒を優雅に泳ぐための、現代のドレスコード。',
    items: [
      { 
        id: 'c_makeup_1', 
        name: 'プリズム・リップグロス', 
        price: 4500, 
        category: '化粧品', 
        feature: '偏光パール配合',
        description: '角度によって表情を変える、オーロラのような輝きを唇に。',
        x: 49, y: 56, 
        zoomScale: 3.5,
        comment: "夜のラウンジ照明の下で、この偏光パールが一番美しく輝きます。重ね塗りするほどに深みが出るので、パーティの必需品ですわ。"
      },
      { 
        id: 'c_makeup_2', 
        name: 'ルミナス・アイライナー (Cyan)', 
        price: 3200, 
        category: '化粧品', 
        feature: '蓄光顔料使用',
        description: '宵闇に浮かび上がる、鮮烈かつ上品なアイライン。',
        x: 58, y: 35, 
        zoomScale: 3.8,
        comment: "目尻に少し引くだけで、洗練されたフューチャリスティックな印象に。黒のドレスとのコントラストを楽しんでいただきたい一品。"
      },
      { 
        id: 'c1', 
        name: 'スマート・バイザー V2', 
        price: 15000, 
        category: '婦人雑貨', 
        feature: 'ARディスプレイ',
        description: '視界を拡張する、インテリジェントなアイウェア。',
        x: 50, y: 22, 
        zoomScale: 2.5,
        comment: "機能性だけでなく、ジュエリーのように顔周りを華やかに見せてくれるデザイン。通知を確認する所作さえも美しくなります。"
      },
      { 
        id: 'c2', 
        name: '高機能ボンバージャケット', 
        price: 42000, 
        category: '婦人服', 
        feature: '完全防水・透湿',
        description: '悪天候さえも味方につける、究極の機能美。',
        x: 50, y: 75, 
        zoomScale: 1.8,
        comment: "「守られている」という安心感と、ドレスのようなシルエットの両立。雨の日の外出が待ち遠しくなる、そんな一着です。"
      },
      { 
        id: 'c3', 
        name: 'コンダクティブ・グローブ', 
        price: 8500, 
        category: '婦人雑貨', 
        feature: 'タッチパネル対応',
        description: '指先まで神経が行き届くような、極上のフィット感。',
        x: 30, y: 85, 
        zoomScale: 2.2,
        comment: "手袋を外さずにスマートに決済まで完了できる。このシームレスな体験こそが、現代のラグジュアリーだと感じます。"
      }
    ]
  },
  {
    id: 'classic_mode',
    title: '静寂を纏う、現代の忍び',
    subTitle: 'MODERN NINJA STYLE',
    // ルック全体の提案者
    curator: {
      name: "YUKI",
      role: "Street Photographer",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
      shortTitle: "ノイズを消し去る、洗練のモノクローム。"
    },
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    description: 'コンクリートジャングルを自在に駆け抜ける。機能性を追求した先に現れる、無駄のない美しさ。',
    items: [
      { 
        id: 'u_makeup_1', 
        name: 'ベルベット・ルージュ (Brick)', 
        price: 3800, 
        category: '化粧品', 
        feature: 'ロングラスティング',
        description: '意志の強さを表現する、深みのあるブリックレッド。',
        x: 50, y: 12, 
        zoomScale: 4.5,
        comment: "撮影中、マスクをしていても落ちにくい驚きの密着力。このブリックカラーは肌の透明感を一層引き立ててくれます。"
      },
      { 
        id: 'u1', 
        name: 'オーバーサイズ・フーディー', 
        price: 18000, 
        category: '婦人服', 
        feature: 'ヘビーオンスコットン',
        description: '包み込まれるような安心感と、計算されたシルエット。',
        x: 50, y: 32, 
        zoomScale: 1.8,
        comment: "フードの立ち上がりが美しく、横顔が凛として見えます。カジュアルなのにどこか品がある、絶妙なバランス感が気に入っています。"
      },
      { 
        id: 'u2', 
        name: 'テック・カーゴパンツ', 
        price: 24000, 
        category: '婦人服', 
        feature: '多機能ポケット',
        description: '手ぶらで街へ。収納力とデザイン性を両立。',
        x: 55, y: 62, 
        zoomScale: 1.8,
        comment: "機材を持って移動するときも、バッグを持たずに歩ける解放感。シルエットが崩れないポケット配置にもこだわりを感じます。"
      },
      { 
        id: 'u3', 
        name: 'エア・クッションスニーカー', 
        price: 32000, 
        category: '婦人靴', 
        feature: '衝撃吸収',
        description: 'まるで無重力。歩くことの喜びを再定義する一足。',
        x: 40, y: 88, 
        zoomScale: 2.5,
        comment: "一日中ロケで歩き回っても全く疲れません。機能性スニーカー特有の野暮ったさがなく、モードな服にも合うのが嬉しい。"
      }
    ]
  }
];

// --- コンポーネント ---

// ARマーカー（クラシックデザイン）
const ARMarker = ({ item, isActive, onClick }) => {
  const isCosmetic = item.category === '化粧品';
  
  return (
    <button
      onClick={onClick}
      className={`absolute z-20 group transition-all duration-700 ease-out`}
      style={{ 
        top: `${item.y}%`, 
        left: `${item.x}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* ターゲットサークル */}
      <div className={`relative flex items-center justify-center transition-all duration-700
        ${isActive ? 'w-24 h-24' : 'w-10 h-10 group-hover:w-14 group-hover:h-14'}
      `}>
        {/* 外枠: アール・デコ調の二重線 */}
        <div className={`absolute inset-0 border border-double rounded-full opacity-80 
          ${isActive ? 'border-yellow-600 animate-spin-slow' : 'border-white/40 group-hover:border-yellow-200'}
        `}></div>
        
        {/* 内側の装飾 */}
        <div className={`absolute inset-3 border border-dashed rounded-full opacity-50 
          ${isActive ? 'border-yellow-500 animate-spin-reverse' : 'border-transparent'}
        `}></div>
        
        {/* 中心点: 菱形 */}
        <div className={`w-2 h-2 rotate-45 transition-all duration-500
          ${isActive ? 'bg-yellow-500 scale-150 shadow-[0_0_20px_rgba(234,179,8,0.5)]' : 'bg-white/80 group-hover:bg-yellow-200'}
        `}></div>

        {/* 展開するラインとラベル (Active時のみ) */}
        {/* SPではラベルが画面外に出ないよう調整、または非表示にするケースもあるが、ここでは表示 */}
        <div className={`absolute left-full top-1/2 ml-4 md:ml-8 flex items-center transition-all duration-700 origin-left z-30
          ${isActive ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'}
        `}>
          {/* 装飾的な接続線 */}
          <div className="flex items-center">
            <div className="w-8 md:w-12 h-[1px] bg-yellow-600/50"></div>
            <div className="w-2 h-2 border border-yellow-600 rotate-45 bg-[#2c0b0e]"></div>
          </div>
          
          {/* クラシックラベル */}
          <div className="ml-2 md:ml-3 bg-[#2c0b0e]/95 backdrop-blur border border-yellow-600/30 px-4 py-2 md:px-5 md:py-3 text-left whitespace-nowrap shadow-2xl relative overflow-hidden rounded-sm">
             {/* 角の装飾 */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500"></div>

            <div className="text-[10px] font-serif tracking-[0.2em] text-yellow-500 mb-1 flex items-center gap-1">
              <Diamond size={8} className="fill-current" />
              {item.category}
            </div>
            <div className="text-[#fdfbf7] font-serif text-sm md:text-base tracking-widest">{item.name}</div>
          </div>
        </div>
      </div>
    </button>
  );
};

// アイテム詳細パネル（SP最適化: ボトムシート風）
const ItemDetailPanel = ({ item, curator, onAddToCart, onClose }) => {
  if (!item) return null;

  return (
    // SP: fixed bottom-0 left-0 w-full (ボトムシート)
    // PC: absolute bottom-12 right-12 w-sm (フローティングカード)
    <div className="fixed bottom-0 left-0 right-0 z-50 md:absolute md:bottom-12 md:right-12 md:left-auto md:z-30 w-full md:w-full md:max-w-sm animate-fade-in-up">
      {/* 背景カード: マルーン色の重厚な背景 */}
      <div className="bg-[#2c0b0e] border-t md:border border-yellow-600/30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-2xl relative transition-all duration-700 p-1 rounded-t-2xl md:rounded-none">
        
        {/* 内枠（金色のライン） */}
        <div className="border-t md:border border-yellow-600/20 p-6 md:p-8 h-full relative overflow-hidden rounded-t-xl md:rounded-none max-h-[80vh] overflow-y-auto">
          
          {/* 背景のダマスク柄風テクスチャ */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>

          <div className="relative z-10">
            {/* SP用: ドラッグハンドルのような装飾 */}
            <div className="w-12 h-1 bg-yellow-600/20 rounded-full mx-auto mb-6 md:hidden"></div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-[1px] bg-yellow-600"></span>
                  <span className="text-[10px] font-serif tracking-[0.2em] text-yellow-500 uppercase">
                    推奨品 No.{item.id.slice(-1)}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-serif text-[#fdfbf7] tracking-widest leading-relaxed mb-1">
                  {item.name}
                </h2>
                <div className="text-xs font-serif text-[#a89f91] tracking-[0.1em]">{item.category}</div>
              </div>
              <button onClick={onClose} className="text-[#a89f91] hover:text-yellow-500 transition-colors duration-300 p-2 -mr-2">
                <X size={24} strokeWidth={0.5} />
              </button>
            </div>

            <p className="text-[#dcd6ce] text-xs md:text-sm font-serif leading-7 md:leading-8 mb-6 tracking-wider text-justify border-l-2 border-yellow-900/50 pl-4">
              {item.description}
            </p>

            {/* インフルエンサーコメントセクション (Curatorの情報を表示) */}
            {item.comment && curator && (
              <div className="mb-6 bg-[#3a1a1a]/50 p-4 border border-yellow-600/10 relative mt-4 rounded-sm">
                <div className="absolute -top-2.5 left-4 bg-[#2c0b0e] px-2 text-[10px] text-yellow-500 font-serif tracking-widest flex items-center gap-2 border border-yellow-600/20">
                  <PenTool size={10} />
                  STYLIST'S VOICE
                </div>
                
                <div className="flex gap-4 items-start pt-2">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full border border-yellow-600/30 p-0.5">
                      <img 
                        src={curator.image} 
                        alt={curator.name} 
                        className="w-full h-full rounded-full object-cover filter sepia-[0.3]"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    {/* 名前と肩書き */}
                    <div className="flex flex-col mb-2 border-b border-yellow-600/10 pb-2">
                       <div className="flex items-baseline gap-2">
                         <span className="text-sm text-[#fdfbf7] font-serif tracking-widest font-bold">{curator.name}</span>
                         <span className="text-[9px] text-yellow-600 font-serif tracking-widest uppercase">{curator.role}</span>
                       </div>
                    </div>

                    <div className="relative">
                      <Quote size={12} className="absolute -top-1 -left-2 text-yellow-600/30 transform -scale-x-100" />
                      <p className="text-xs text-[#dcd6ce] font-serif italic leading-relaxed tracking-wider pl-2">
                        {item.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* スペック表 */}
            <div className="mb-6 border-t border-b border-yellow-600/20 py-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-yellow-600 font-serif tracking-widest mb-1">特徴</div>
                <div className="text-xs md:text-sm font-serif text-[#fdfbf7] tracking-wide">{item.feature}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-yellow-600 font-serif tracking-widest mb-1">価格（税込）</div>
                <div className="text-base md:text-lg font-serif text-yellow-500 tracking-wider">
                  ¥{item.price.toLocaleString()}
                </div>
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(item)}
              className="w-full py-4 bg-[#fdfbf7] text-[#2c0b0e] font-serif text-xs md:text-sm tracking-[0.25em] hover:bg-[#e6e2d8] transition-all duration-500 flex items-center justify-center gap-4 group relative overflow-hidden shadow-lg active:scale-[0.98]"
            >
              <span className="relative z-10">カートに入れる</span>
              <ShoppingBag size={16} className="text-[#2c0b0e] group-hover:scale-110 transition-transform duration-500 relative z-10" strokeWidth={1} />
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent group-hover:animate-shine"></div>
            </button>
            
            {/* SP用: 下部の余白確保 (iPhoneのバー対策) */}
            <div className="h-4 md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// メインアプリケーション
export default function App() {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [focusedItemId, setFocusedItemId] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const currentLook = LOOKS[currentLookIndex];
  const focusedItem = currentLook.items.find(i => i.id === focusedItemId);

  const getZoomStyle = () => {
    if (!focusedItem) return { transform: 'scale(1) translate(0%, 0%)' };
    const scale = focusedItem.zoomScale;
    const xOffset = (50 - focusedItem.x) * (scale / 2.5);
    const yOffset = (50 - focusedItem.y) * (scale / 2.5);

    return {
      transform: `scale(${scale}) translate(${xOffset}%, ${yOffset}%)`,
      transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
    };
  };

  const handleNextLook = () => {
    setFocusedItemId(null);
    setCurrentLookIndex((prev) => (prev + 1) % LOOKS.length);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  return (
    // SP: h-[100dvh]でアドレスバーの影響を受けない高さ設定
    <div className="h-[100dvh] w-full bg-[#1a0505] text-[#fdfbf7] font-serif overflow-hidden flex flex-col md:flex-row selection:bg-yellow-900/50 selection:text-yellow-100">
      
      {/* サイドバー / ヘッダー */}
      <div className="z-40 w-full md:w-[400px] bg-[#2a0a0a] border-b md:border-b-0 md:border-r border-yellow-600/20 flex flex-col flex-shrink-0 relative shadow-2xl transition-all duration-300">
        
        {/* 背景テクスチャ */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)',
            backgroundSize: '30px 30px'
        }}></div>

        {/* ヘッダー */}
        <div className="p-4 md:p-8 flex justify-between items-center bg-[#2a0a0a]/90 backdrop-blur-sm z-10 border-b border-yellow-600/10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-yellow-600/40 flex items-center justify-center rounded-sm">
              <span className="text-yellow-600 font-serif font-bold text-lg md:text-xl italic font-serif">H</span>
            </div>
            <div>
              <div className="font-serif tracking-[0.2em] text-[10px] md:text-xs text-yellow-600/80 mb-0.5">VIRTUAL SALON</div>
              <div className="font-serif tracking-[0.1em] text-xs md:text-sm text-[#fdfbf7]">阪急うめだ本店</div>
            </div>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 md:p-3 text-[#a89f91] hover:text-yellow-500 transition-colors duration-300 border border-transparent hover:border-yellow-600/20 rounded-full"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full border border-[#2a0a0a]"></span>
            )}
          </button>
        </div>

        {/* ルック情報 & アイテムリスト (SPでは高さを制限して画像エリアを確保) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-10 z-10 custom-scrollbar max-h-[35vh] md:max-h-full">
          <div className="mb-8 md:mb-12 relative">
            <div className="absolute -left-4 top-2 bottom-2 w-[1px] bg-gradient-to-b from-transparent via-yellow-600/30 to-transparent"></div>
            
            <div className="flex justify-between items-end pb-3 md:pb-4 border-b border-yellow-600/20 mb-4 md:mb-6">
              <span className="text-[10px] font-serif tracking-[0.25em] text-yellow-600/80">COLLECTION NO.0{currentLookIndex + 1}</span>
              <div className="flex gap-2">
                {LOOKS.map((_, idx) => (
                  <div key={idx} className={`h-1.5 w-1.5 rotate-45 transition-all duration-700 ${idx === currentLookIndex ? 'bg-yellow-600' : 'border border-yellow-600/30'}`} />
                ))}
              </div>
            </div>

            {/* キュレーター（インフルエンサー）情報表示エリア */}
            {currentLook.curator && (
              <div className="flex items-center gap-4 mb-6 animate-fade-in-up delay-100">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-yellow-600/40 p-0.5 flex-shrink-0">
                  <img 
                    src={currentLook.curator.image} 
                    alt={currentLook.curator.name} 
                    className="w-full h-full rounded-full object-cover filter sepia-[0.3]"
                  />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-0.5">
                     <span className="text-yellow-600 font-serif text-[9px] md:text-[10px] tracking-widest uppercase">{currentLook.curator.role}</span>
                     <span className="w-8 h-[1px] bg-yellow-600/30"></span>
                     <span className="text-[#dcd6ce] font-serif text-xs md:text-sm tracking-widest font-bold">{currentLook.curator.name}</span>
                   </div>
                   <p className="text-[#fdfbf7] font-serif italic text-xs md:text-sm tracking-wider">"{currentLook.curator.shortTitle}"</p>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-[10px] md:text-xs text-[#a89f91] font-sans tracking-[0.2em] mb-2 md:mb-3">{currentLook.subTitle}</h2>
              <h1 className="text-2xl md:text-3xl font-serif text-[#fdfbf7] tracking-wider leading-snug mb-3 md:mb-4">
                {currentLook.title}
              </h1>
            </div>
            <p className="text-[#dcd6ce] text-[10px] md:text-xs leading-loose font-serif tracking-wider text-justify line-clamp-3 md:line-clamp-none">
              {currentLook.description}
            </p>
          </div>

          {/* アイテムリスト */}
          <div className="space-y-4 md:space-y-8">
            <h3 className="text-center relative">
              <span className="bg-[#2a0a0a] px-4 relative z-10 text-[11px] font-serif text-yellow-600 tracking-[0.3em]">ITEM LIST</span>
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-600/20 -z-0"></div>
            </h3>
            
            <div className="space-y-2 md:space-y-3">
              {currentLook.items.map((item) => {
                const isActive = focusedItemId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setFocusedItemId(isActive ? null : item.id)}
                    onMouseEnter={() => {
                      if (window.matchMedia('(min-width: 768px)').matches) {
                         setFocusedItemId(item.id);
                      }
                    }}
                    className={`w-full group text-left px-4 py-3 md:px-6 md:py-5 border transition-all duration-500 relative overflow-hidden rounded-sm
                      ${isActive 
                        ? 'bg-[#3a1a1a] border-yellow-600/40 shadow-lg' 
                        : 'bg-transparent border-white/5 hover:bg-[#351515] hover:border-yellow-600/20'
                      }
                    `}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-3 md:gap-5">
                        <div className={`w-1 h-1 md:w-8 md:h-[1px] transition-all duration-500 
                          ${isActive ? 'bg-yellow-500 md:w-12 scale-150 md:scale-100 rotate-45 md:rotate-0' : 'bg-[#5c4a4a]'}
                        `} />
                        <div>
                          <div className={`text-[9px] md:text-[10px] font-serif tracking-[0.1em] mb-0.5 md:mb-1 transition-colors
                            ${isActive ? 'text-yellow-500' : 'text-[#8c7a7a]'}
                          `}>
                            {item.category}
                          </div>
                          <div className={`text-xs md:text-sm font-serif tracking-widest transition-colors duration-300 ${isActive ? 'text-[#fdfbf7]' : 'text-[#c8c0b5]'}`}>
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <span className={`text-yellow-600 transition-all duration-500 ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                        <Star size={10} fill="currentColor" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ルック切り替えボタン */}
        <div className="p-4 md:p-6 bg-[#2a0a0a] z-10 border-t border-yellow-600/10">
          <button 
            onClick={handleNextLook}
            className="group w-full py-3 md:py-4 border border-yellow-600/30 flex items-center justify-center gap-4 hover:bg-[#3a1a1a] hover:border-yellow-600/50 transition-all duration-500 active:bg-[#4a2a2a]"
          >
            <span className="text-[10px] md:text-xs font-serif tracking-[0.3em] text-[#dcd6ce] group-hover:text-yellow-100 transition-colors">次のスタイルを見る</span>
            <div className="w-8 h-[1px] bg-yellow-600/50 group-hover:w-12 transition-all duration-500"></div>
          </button>
        </div>
      </div>

      {/* メインビジュアルエリア */}
      <div className="flex-1 relative bg-[#1a0505] overflow-hidden cursor-crosshair group/canvas">
        
        {/* 画像コンテナ */}
        <div 
          className="w-full h-full relative"
          style={getZoomStyle()}
        >
          <img 
            src={currentLook.modelImage} 
            alt="Model" 
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.1] sepia-[0.2]"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1a0505]/20 to-[#1a0505] pointer-events-none"></div>

          {/* ARマーカー */}
          {currentLook.items.map((item) => (
            <ARMarker 
              key={item.id} 
              item={item} 
              isActive={focusedItemId === item.id}
              onClick={() => setFocusedItemId(item.id === focusedItemId ? null : item.id)}
            />
          ))}
        </div>

        {/* HUDオーバーレイ */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 四隅の装飾フレーム (SPでは少し小さく) */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 w-12 h-12 md:w-16 md:h-16 border-t border-l border-yellow-600/30"></div>
          <div className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 border-t border-r border-yellow-600/30"></div>
          {/* 下部はパネルが来るのでSPでは非表示にする手もあるが、装飾として残す */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-12 h-12 md:w-16 md:h-16 border-b border-l border-yellow-600/30"></div>
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-16 md:h-16 border-b border-r border-yellow-600/30"></div>

          {/* 状態表示 */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10">
             <div className="flex items-center gap-3 text-[10px] font-serif tracking-[0.2em] text-yellow-600/70 border border-yellow-600/20 px-3 py-1 md:px-4 md:py-2 bg-[#1a0505]/80 backdrop-blur">
                <span>ZOOM: {focusedItem ? focusedItem.zoomScale.toFixed(1) : '1.0'}x</span>
                <span className="w-[1px] h-3 bg-yellow-600/30"></span>
                <span className={focusedItemId ? 'text-yellow-500' : ''}>
                  {focusedItemId ? 'LOCKED' : 'READY'}
                </span>
             </div>
          </div>

          {/* 中央照準 */}
          {!focusedItemId && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/5 transition-opacity duration-700 group-hover/canvas:text-yellow-600/20">
              <Scan size={80} md:size={120} strokeWidth={0.5} />
            </div>
          )}
        </div>

        {/* 詳細パネル（SP最適化済み） */}
        <div className="pointer-events-auto">
          <ItemDetailPanel 
            item={focusedItem} 
            curator={currentLook.curator}
            onAddToCart={addToCart} 
            onClose={() => setFocusedItemId(null)}
          />
        </div>

        {/* リセットオーバーレイ */}
        {focusedItemId && (
          <div 
            className="absolute inset-0 z-10" 
            onClick={() => setFocusedItemId(null)}
          ></div>
        )}
      </div>

      {/* カートドロワー (SP: 全幅 / PC: 420px) */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[420px] bg-[#2a0a0a] border-l border-yellow-600/20 transform transition-transform duration-700 z-[60] p-6 md:p-12 shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8 md:mb-16 border-b border-yellow-600/20 pb-6">
          <h2 className="font-serif text-lg md:text-xl tracking-[0.3em] text-yellow-600">お買い物カゴ</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#8c7a7a] hover:text-yellow-500 transition-colors"><X size={24} strokeWidth={0.5} /></button>
        </div>
        
        <div className="space-y-6 md:space-y-8 overflow-y-auto max-h-[60vh]">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between items-start border-b border-white/5 pb-4 md:pb-6 animate-fade-in-up">
              <div>
                <div className="text-[10px] font-serif text-yellow-600/70 tracking-[0.1em] mb-1 md:mb-2">{item.category}</div>
                <div className="font-serif text-sm md:text-base text-[#fdfbf7] tracking-widest mb-1">{item.name}</div>
              </div>
              <div className="font-serif text-xs md:text-sm text-yellow-500 tracking-wide">¥{item.price.toLocaleString()}</div>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-[#8c7a7a] font-serif text-center py-12 md:py-24 text-xs md:text-sm tracking-widest leading-loose">
              お客様のカートは現在空でございます。<br />
              どうぞごゆっくり、<br />館内をご覧くださいませ。
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-[#2a0a0a] border-t border-yellow-600/20">
            <div className="flex justify-between font-serif text-base md:text-lg mb-6 md:mb-10 text-[#fdfbf7]">
              <span className="tracking-widest text-xs md:text-sm text-[#a89f91]">合計金額</span>
              <span className="text-lg md:text-xl">¥{cart.reduce((sum, i) => sum + i.price, 0).toLocaleString()}</span>
            </div>
            <button className="w-full py-4 md:py-5 bg-[#800020] text-[#fdfbf7] font-serif text-xs tracking-[0.3em] hover:bg-[#600018] transition-all duration-500 shadow-xl border border-white/10">
              購入手続きへ進む
            </button>
          </div>
        )}
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 16s linear infinite; }
        .animate-spin-reverse { animation: spin 20s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes shine {
          to { left: 200%; }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
        
        /* カスタムスクロールバー */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #5c4a4a; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4af37; }
      `}</style>
    </div>
  );
}11