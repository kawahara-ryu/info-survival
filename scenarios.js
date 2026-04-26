const scenarios = {
  start: {
    text: "ある日の放課後。あなたはスマートフォンを見ながら、情報社会の荒波をサバイバルしていく。\\nまずは最初のトラブルだ！",
    image: null,
    speaker: "システム",
    trustChange: 0,
    choices: [
      { text: "サバイバルを開始する", nextId: "scene1" }
    ]
  },
  scene1: {
    text: "友達の「ボクバナナ」が、有名なアーティストの曲を勝手に使って文化祭の宣伝動画を作り、SNSにアップしようとしている！\\n『これ絶対バズるニャ！』と言っているが...",
    image: "./scenario_copyright.png",
    speaker: "ボクバナナ",
    trustChange: 0,
    choices: [
      { text: "「いいね！すぐアップしよう！」", nextId: "bad1" },
      { text: "「ダメだよ！著作権侵害になるよ！」", nextId: "scene2" },
      { text: "「少しだけならバレないから平気だよ」", nextId: "bad1_gray" },
      { text: "ネットで著作権について調べる", nextId: "scene1_search" }
    ]
  },
  scene1_search: {
    text: "【検索結果】「他人の楽曲を無断でBGMとしてSNSにアップロードする行為は、公衆送信権などの著作権侵害にあたります。フリー音源を使いましょう」",
    image: null,
    speaker: "ブラウザ",
    trustChange: 10,
    choices: [
      { text: "ボクバナナにフリー音源を使うよう説得する", nextId: "scene2" }
    ]
  },
  bad1: {
    text: "【BAD END: 著作権侵害】\\nアーティストの曲を無断で使用しSNSで公開することは、著作権の「公衆送信権」などの侵害にあたります。動画はすぐに削除され、学校にも通報されて大問題になってしまいました...",
    image: null,
    speaker: "システム",
    trustChange: -100,
    choices: [
      { text: "最初からやり直す", nextId: "start" }
    ]
  },
  bad1_gray: {
    text: "ボクバナナはそのまま動画をアップした。すぐに削除はされなかったが、見知らぬ人から「これ無断転載ですよね？」とコメントが来て炎上しかけている...。少し信用を失った。",
    image: null,
    speaker: "システム",
    trustChange: -40,
    choices: [
      { text: "動画を削除させて、次の日へ", nextId: "scene2" }
    ]
  },
  scene2: {
    text: "著作権の危険性を伝えると、ボクバナナはフリー音源（クリエイティブ・コモンズ BY）を使って動画を完成させた。\\n次の日、街を歩いていると、超有名な芸能人「スター・バナナ」がプライベートで歩いているのを発見した！",
    image: "./scenario_portrait.png",
    speaker: "システム",
    trustChange: 0,
    choices: [
      { text: "こっそり写真を撮って、位置情報付きでSNSに投稿する", nextId: "bad2" },
      { text: "パブリシティ権の侵害になるかもしれないから、見るだけにする", nextId: "scene3" },
      { text: "サインをもらって、一緒に自撮りした写真を無断でアイコンにする", nextId: "bad3" }
    ]
  },
  bad2: {
    text: "【BAD END: プライバシー・肖像権の侵害】\\n有名人であってもプライベートな姿を無断で撮影・公開する行為は肖像権の侵害です。さらに位置情報をつけたことで、パパラッチが集まり、あなたは激しく炎上しました...",
    image: null,
    speaker: "システム",
    trustChange: -100,
    choices: [
      { text: "最初からやり直す", nextId: "start" }
    ]
  },
  bad3: {
    text: "【BAD END: パブリシティ権の侵害】\\n一緒に撮った写真でも、有名人の持つ「経済的価値（顧客吸引力）」を利用して無断でアイコンや広告などに使うことは「パブリシティ権」の侵害になる可能性があります...",
    image: null,
    speaker: "システム",
    trustChange: -100,
    choices: [
      { text: "最初からやり直す", nextId: "start" }
    ]
  },
  scene3: {
    text: "ピコン！突然、あなたのスマホにSMSが届いた。\\n『【緊急】あなたのアカウントが不正アクセスを受けました。24時間以内に以下のURLからログインしてパスワードを変更してください！』",
    image: null,
    speaker: "メッセージアプリ",
    trustChange: 0,
    timeLimit: 5,
    timeoutNextId: "bad_timeout",
    choices: [
      { text: "急いでURLをタップしてログインする", nextId: "bad_phishing" },
      { text: "公式アプリを開いて直接確認する", nextId: "scene4" }
    ]
  },
  bad_timeout: {
    text: "【BAD END: パニック】\\n焦って何も考えられず、言われるがままにURLをタップして情報を入力してしまった！アカウントが乗っ取られ、個人情報が流出しました...",
    image: null,
    speaker: "システム",
    trustChange: -100,
    choices: [
      { text: "最初からやり直す", nextId: "start" }
    ]
  },
  bad_phishing: {
    text: "【BAD END: フィッシング詐欺】\\nそれは偽のWebサイト（フィッシングサイト）でした！入力したIDやパスワードが盗まれ、あなたのSNSアカウントは乗っ取られてしまいました...",
    image: null,
    speaker: "システム",
    trustChange: -100,
    choices: [
      { text: "最初からやり直す", nextId: "start" }
    ]
  },
  scene4: {
    text: "公式アプリから確認すると、不正アクセスの形跡はなかった。フィッシング詐欺を回避した！\\nしかし安心したのもつかの間、自分のSNSを見ると、数年前に撮られた自分の『超恥ずかしい変顔写真』が勝手に誰かに投稿されているのを発見した！",
    image: "./scenario_privacy.png",
    speaker: "システム",
    trustChange: 10,
    choices: [
      { text: "「忘れられる権利」を主張して、サイト管理者に削除を要請する", nextId: "clear" },
      { text: "恥ずかしいけど、一度投稿されたものは完全に消せないから放置する", nextId: "bad4" }
    ]
  },
  bad4: {
    text: "【BAD END: デジタルタトゥー】\\n放置した結果、その画像は「フリー素材」として世界中に拡散され（伝播性・複製性）、一生消えないデジタルタトゥーとなってしまいました。おかげで就職活動にも悪影響が...",
    image: null,
    speaker: "システム",
    trustChange: -100,
    choices: [
      { text: "最初からやり直す", nextId: "start" }
    ]
  },
  clear: {
    text: "【MISSION CLEARED!】\\nあなたは適切な権利を主張し、恥ずかしい画像を削除することに成功した！情報社会の荒波を見事にサバイブしたあなたの勝利だ！",
    image: null,
    speaker: "システム",
    trustChange: 0,
    choices: []
  }
};
