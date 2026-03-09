import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: {
      "welcome": "欢迎回来",
      "create_account": "创建你的研究账号",
      "login_desc": "探索中草药的奥秘，利用AI技术提升识别效率。",
      "login_title": "账号登录",
      "register_title": "账号注册",
      "login_subtitle": "请输入您的账号密码进行登录",
      "register_subtitle": "填写以下信息创建新账号",
      "email": "邮箱",
      "username": "用户名",
      "password": "密码",
      "forgot_password": "忘记密码？",
      "login_btn": "立即登录",
      "register_btn": "注册账号",
      "no_account": "还没有账号？",
      "have_account": "已有账号？",
      "register_link": "立即注册",
      "login_link": "返回登录",
      "dashboard": "仪表盘",
      "home": "首页",
      "recognize": "图像识别",
      "history": "识别记录",
      "users": "用户管理",
      "announcements": "公告管理",
      "welcome_admin": "欢迎回来，Admin",
      "system_overview": "这里是 HerbVision 中草药图像识别系统的运行概况。",
      "total_recognitions": "总识别次数",
      "today_recognitions": "今日识别",
      "active_users": "活跃用户",
      "model_accuracy": "模型准确率",
      "quick_actions": "快捷入口",
      "start_recognize": "开始识别",
      "recognize_desc": "上传图片进行药材鉴定",
      "view_history": "查看记录",
      "history_desc": "浏览历史识别结果",
      "system_status": "系统状态",
      "model_service": "模型服务 (ResNet50)",
      "db_connection": "数据库连接",
      "storage_usage": "存储空间使用率",
      "running": "运行中",
      "normal": "正常",
      "herb_library": "药材库"
    }
  },
  en: {
    translation: {
      "welcome": "Welcome Back",
      "create_account": "Create Your Research Account",
      "login_desc": "Explore the mysteries of Chinese herbs and use AI technology to improve identification efficiency.",
      "login_title": "Login",
      "register_title": "Register",
      "login_subtitle": "Please enter your account and password to login",
      "register_subtitle": "Fill in the information below to create a new account",
      "email": "Email",
      "username": "Username",
      "password": "Password",
      "forgot_password": "Forgot password?",
      "login_btn": "Login Now",
      "register_btn": "Register Now",
      "no_account": "Don't have an account?",
      "have_account": "Already have an account?",
      "register_link": "Register Now",
      "login_link": "Back to Login",
      "dashboard": "Dashboard",
      "home": "Home",
      "recognize": "Recognition",
      "history": "History",
      "users": "Users",
      "announcements": "Announcements",
      "welcome_admin": "Welcome back, Admin",
      "system_overview": "Here is the operational overview of the HerbVision system.",
      "total_recognitions": "Total Recognitions",
      "today_recognitions": "Today's Recognitions",
      "active_users": "Active Users",
      "model_accuracy": "Model Accuracy",
      "quick_actions": "Quick Actions",
      "start_recognize": "Start Recognition",
      "recognize_desc": "Upload images for identification",
      "view_history": "View History",
      "history_desc": "Browse past results",
      "system_status": "System Status",
      "model_service": "Model Service (ResNet50)",
      "db_connection": "Database Connection",
      "storage_usage": "Storage Usage",
      "running": "Running",
      "normal": "Normal",
      "herb_library": "Herb Library"
    }
  },
  pt: {
    translation: {
      "welcome": "Bem-vindo de volta",
      "create_account": "Crie sua conta de pesquisa",
      "login_desc": "Explore os mistérios das ervas chinesas e use a tecnologia de IA para melhorar a eficiência da identificação.",
      "login_title": "Login",
      "register_title": "Registrar",
      "login_subtitle": "Por favor, insira sua conta e senha para fazer login",
      "register_subtitle": "Preencha as informações abaixo para criar uma nova conta",
      "email": "E-mail",
      "username": "Nome de usuário",
      "password": "Senha",
      "forgot_password": "Esqueceu a senha?",
      "login_btn": "Fazer Login",
      "register_btn": "Registrar Agora",
      "no_account": "Não tem uma conta?",
      "have_account": "Já tem uma conta?",
      "register_link": "Registrar Agora",
      "login_link": "Voltar ao Login",
      "dashboard": "Painel",
      "home": "Início",
      "recognize": "Reconhecimento",
      "history": "Histórico",
      "users": "Usuários",
      "announcements": "Anúncios",
      "welcome_admin": "Bem-vindo, Admin",
      "system_overview": "Aqui está a visão geral operacional do sistema HerbVision.",
      "total_recognitions": "Total de Reconhecimentos",
      "today_recognitions": "Reconhecimentos de Hoje",
      "active_users": "Usuários Ativos",
      "model_accuracy": "Precisão do Modelo",
      "quick_actions": "Ações Rápidas",
      "start_recognize": "Iniciar Reconhecimento",
      "recognize_desc": "Envie imagens para identificação",
      "view_history": "Ver Histórico",
      "history_desc": "Navegar pelos resultados passados",
      "system_status": "Status do Sistema",
      "model_service": "Serviço de Modelo (ResNet50)",
      "db_connection": "Conexão com Banco de Dados",
      "storage_usage": "Uso de Armazenamento",
      "running": "Em execução",
      "normal": "Normal",
      "herb_library": "Biblioteca de Ervas"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
