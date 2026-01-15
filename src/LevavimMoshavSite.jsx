import React, { useState, useEffect, useRef } from "react";
import { Calendar, Users, MessageCircle, ChevronDown, Archive, Mail, Store, Phone, MapPin, Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function LevavimMoshavSite() {
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isArchiveMenuOpen, setIsArchiveMenuOpen] = useState(false);
  const [isRealEstateMenuOpen, setIsRealEstateMenuOpen] = useState(false);
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactEmailForm, setContactEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailSent, setEmailSent] = useState(false);
  const menuRef = useRef(null);
  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      name: 'דוד כהן',
      email: 'david@example.com',
      message: 'שלום, רציתי לשאול לגבי אירוע הקרוב. מתי בדיוק?',
      date: '15.01.2024, 10:30'
    },
    {
      id: 2,
      name: 'שרה לוי',
      email: 'sara@example.com',
      message: 'תודה על האירוע האחרון, היה נהדר!',
      date: '14.01.2024, 18:45'
    },
    {
      id: 3,
      name: 'יוסי ישראלי',
      email: 'yossi@example.com',
      message: 'מתי מתקיים יום הניקיון הבא?',
      date: '13.01.2024, 14:20'
    }
  ]);
  const archiveMenuRef = useRef(null);
  const realEstateMenuRef = useRef(null);
  const coursesMenuRef = useRef(null);

  const categories = [
    { id: 1, name: "צימרים", icon: Store },
    { id: 2, name: "עיסויים", icon: Store },
    { id: 3, name: "בעלי מקצוע", icon: Store },
    { id: 4, name: "תיירות", icon: Store },
    { id: 5, name: "מסעדות ובתי קפה", icon: Store },
    { id: 6, name: "חנויות", icon: Store },
  ];

  // פונקציה ליצירת קישור וואטסאפ
  const getWhatsAppLink = (phone) => {
    const cleanPhone = phone.replace(/-/g, '').replace(/\s/g, '');
    return `https://wa.me/972${cleanPhone.substring(1)}`;
  };

  const businesses = {
    1: [ // צימרים
      { id: 1, name: "צימר נוף הרים", phone: "050-1234567", email: "noff@levavim.co.il", address: "רחוב הראשונים 12", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop", whatsapp: "0501234567" },
      { id: 2, name: "צימר שקט ונוח", phone: "050-2345678", email: "shaket@levavim.co.il", address: "רחוב הטבע 5", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop", whatsapp: "0502345678" },
      { id: 3, name: "צימר גן עדן", phone: "050-3456789", email: "gan@levavim.co.il", address: "רחוב השלום 8", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop", whatsapp: "0503456789" },
      { id: 4, name: "צימר נוף כפרי", phone: "050-4567890", email: "kfari@levavim.co.il", address: "רחוב השדות 15", image: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&h=300&fit=crop", whatsapp: "0504567890" },
    ],
    2: [ // עיסויים
      { id: 1, name: "עיסוי רפואי - שרה כהן", phone: "050-1111111", email: "sara@levavim.co.il", address: "רחוב הבריאות 3", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop", whatsapp: "0501111111" },
      { id: 2, name: "עיסוי שוודי - דוד לוי", phone: "050-2222222", email: "david@levavim.co.il", address: "רחוב הרפואה 7", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop", whatsapp: "0502222222" },
      { id: 3, name: "עיסוי תאילנדי - רונית ישראלי", phone: "050-3333333", email: "ronit@levavim.co.il", address: "רחוב השלווה 10", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop", whatsapp: "0503333333" },
      { id: 4, name: "עיסוי רפואי - מיכל דוד", phone: "050-4444444", email: "michal@levavim.co.il", address: "רחוב הרוגע 12", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop", whatsapp: "0504444444" },
    ],
    3: [ // בעלי מקצוע
      { id: 1, name: "חשמלאי - יוסי כהן", phone: "050-5555555", email: "yossi@levavim.co.il", address: "רחוב החשמל 2", image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop", whatsapp: "0505555555" },
      { id: 2, name: "שרברב - משה לוי", phone: "050-6666666", email: "moshe@levavim.co.il", address: "רחוב המים 4", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop", whatsapp: "0506666666" },
      { id: 3, name: "נגר - אבי ישראלי", phone: "050-7777777", email: "avi@levavim.co.il", address: "רחוב העץ 6", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop", whatsapp: "0507777777" },
      { id: 4, name: "צבע - רמי דוד", phone: "050-8888888", email: "rami@levavim.co.il", address: "רחוב הצבעים 9", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop", whatsapp: "0508888888" },
    ],
    4: [ // תיירות
      { id: 1, name: "טיולי שטח - גיא הרפתקאות", phone: "050-9999999", email: "guy@levavim.co.il", address: "רחוב הטבע 1", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", whatsapp: "0509999999" },
      { id: 2, name: "סיורים מודרכים - טל תיירות", phone: "050-1010101", email: "tal@levavim.co.il", address: "רחוב התיירות 3", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop", whatsapp: "0501010101" },
      { id: 3, name: "רכיבה על סוסים - חוות הסוסים", phone: "050-2020202", email: "susim@levavim.co.il", address: "רחוב החווה 5", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5f?w=400&h=300&fit=crop", whatsapp: "0502020202" },
      { id: 4, name: "פעילויות משפחתיות - משפחה כיף", phone: "050-3030303", email: "mishpacha@levavim.co.il", address: "רחוב המשפחה 7", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop", whatsapp: "0503030303" },
    ],
    5: [ // מסעדות ובתי קפה
      { id: 1, name: "קפה נוף - בית קפה", phone: "050-4040404", email: "cafe@levavim.co.il", address: "רחוב הקפה 2", image: "https://images.unsplash.com/photo-1501339847302-ac426a4c7cfe?w=400&h=300&fit=crop", whatsapp: "0504040404" },
      { id: 2, name: "מסעדת הטבע - אוכל כפרי", phone: "050-5050505", email: "restaurant@levavim.co.il", address: "רחוב האוכל 4", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop", whatsapp: "0505050505" },
      { id: 3, name: "בית קפה שדות - קפה ומאפים", phone: "050-6060606", email: "sadot@levavim.co.il", address: "רחוב השדות 6", image: "https://images.unsplash.com/photo-1501339847302-ac426a4c7cfe?w=400&h=300&fit=crop", whatsapp: "0506060606" },
      { id: 4, name: "פיצרייה כפרית - פיצות", phone: "050-7070707", email: "pizza@levavim.co.il", address: "רחוב הפיצה 8", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", whatsapp: "0507070707" },
    ],
    6: [ // חנויות
      { id: 1, name: "חנות כלבו - כל מה שצריך", phone: "050-8080808", email: "kolbo@levavim.co.il", address: "רחוב הקניות 1", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", whatsapp: "0508080808" },
      { id: 2, name: "חנות ירקות - ירקות טריים", phone: "050-9090909", email: "yrakot@levavim.co.il", address: "רחוב הירקות 3", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop", whatsapp: "0509090909" },
      { id: 3, name: "חנות מתנות - מתנות ייחודיות", phone: "050-1212121", email: "matanot@levavim.co.il", address: "רחוב המתנות 5", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", whatsapp: "0501212121" },
      { id: 4, name: "חנות כלי עבודה - כלי עבודה", phone: "050-1313131", email: "kli@levavim.co.il", address: "רחוב הכלים 7", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop", whatsapp: "0501313131" },
    ],
  };

  const announcements = [
    "📢 ישיבת ועד - יום ראשון בשעה 20:00",
    "🎉 אירוע קהילתי - שבת הקרובה בשעה 18:00",
    "⚠️ תחזוקה - כביש ראשי ייסגר ביום שני",
    "🌳 יום ניקיון - יום רביעי בשעה 08:00",
    "📋 הרשמה לחוגים - עד יום חמישי",
    "🏠 מכירת דירות - פנו למזכירות",
    "🚗 שירות הסעות - זמנים מעודכנים באתר",
    "💧 עבודות תשתית - שימו לב לשינויים",
  ];


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsBusinessMenuOpen(false);
      }
      if (archiveMenuRef.current && !archiveMenuRef.current.contains(event.target)) {
        setIsArchiveMenuOpen(false);
      }
      if (realEstateMenuRef.current && !realEstateMenuRef.current.contains(event.target)) {
        setIsRealEstateMenuOpen(false);
      }
      if (coursesMenuRef.current && !coursesMenuRef.current.contains(event.target)) {
        setIsCoursesMenuOpen(false);
      }
    };

    if (isBusinessMenuOpen || isArchiveMenuOpen || isRealEstateMenuOpen || isCoursesMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBusinessMenuOpen, isArchiveMenuOpen, isRealEstateMenuOpen, isCoursesMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // עיצוב משותף לכפתורים
  const buttonStyle = {
    display:'flex', 
    alignItems:'center', 
    gap:'10px', 
    fontSize:'18px', 
    color:'#2f4f3f', 
    padding:'18px 30px', 
    background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
    borderRadius:'14px', 
    boxShadow:'0 4px 16px rgba(139, 195, 74, 0.15), 0 2px 8px rgba(47, 79, 63, 0.1)', 
    cursor:'pointer', 
    transition:'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border:'2px solid rgba(139, 195, 74, 0.2)',
    fontWeight:'500'
  };

  const buttonHoverEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 195, 74, 0.25), 0 4px 12px rgba(47, 79, 63, 0.15)';
    e.currentTarget.style.borderColor = '#8bc34a';
    e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)';
  };

  const buttonHoverLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 195, 74, 0.15), 0 2px 8px rgba(47, 79, 63, 0.1)';
    e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
    e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)';
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: forumPosts.length + 1,
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      date: new Date().toLocaleString('he-IL', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setForumPosts([newPost, ...forumPosts]);
    setContactForm({
      name: '',
      email: '',
      message: ''
    });
  };

  const handleContactChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailFormChange = (e) => {
    setContactEmailForm({
      ...contactEmailForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // יצירת קישור mailto לשליחת מייל
    const subject = encodeURIComponent(contactEmailForm.subject || 'פנייה ממושב לבנים');
    const body = encodeURIComponent(
      `שלום,\n\n${contactEmailForm.message}\n\nבברכה,\n${contactEmailForm.name}\n${contactEmailForm.email}`
    );
    const mailtoLink = `mailto:vaad@levavim.co.il?subject=${subject}&body=${body}`;
    
    // פתיחת תוכנת המייל
    window.location.href = mailtoLink;
    
    // הצגת הודעת הצלחה
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setContactEmailForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div style={{
      fontFamily:'"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', 
      background:'linear-gradient(135deg, #f8f6f0 0%, #faf8f3 50%, #f5f2e8 100%)', 
      minHeight:'100vh', 
      direction:'rtl', 
      position:'relative',
      backgroundImage:'radial-gradient(circle at 20% 50%, rgba(139, 195, 74, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.05) 0%, transparent 50%)'
    }}>
      {/* לוח מודעות מצד ימין */}
      <div style={{
        position:'fixed',
        right:0,
        top:0,
        bottom:0,
        width:'300px',
        background:'linear-gradient(180deg, #4a7c59 0%, #3d6b4a 30%, #2f4f3f 70%, #1a3328 100%)',
        color:'white',
        zIndex:100,
        boxShadow:'-4px 0 24px rgba(0,0,0,0.35)',
        display:'flex',
        flexDirection:'column',
        padding:'20px 0',
        borderLeft:'4px solid rgba(255, 193, 7, 0.4)'
      }}>
        <div style={{
          padding:'20px',
          borderBottom:'2px solid rgba(255,255,255,0.2)',
          marginBottom:'20px',
          background:'rgba(255,255,255,0.05)',
          backdropFilter:'blur(10px)'
        }}>
          <h3 style={{
            margin:0, 
            fontSize:'22px', 
            fontWeight:'bold', 
            textAlign:'center',
            textShadow:'0 2px 4px rgba(0,0,0,0.3)',
            letterSpacing:'1px'
          }}>
            📢 לוח מודעות
          </h3>
        </div>
        
        <div style={{
          flex:1,
          overflow:'hidden',
          position:'relative',
          padding:'0 10px'
        }}>
          <motion.div 
            style={{
              display:'flex',
              flexDirection:'column',
              gap:'15px'
            }}
            animate={{
              y: [0, -(announcements.length * 110)]
            }}
            transition={{
              duration: announcements.length * 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0
            }}
          >
            {[...announcements, ...announcements].map((announcement, index) => (
              <div
                key={index}
                style={{
                  background:'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  padding:'18px',
                  borderRadius:'12px',
                  border:'1px solid rgba(255,255,255,0.3)',
                  fontSize:'14px',
                  lineHeight:'1.7',
                  backdropFilter:'blur(15px)',
                  minHeight:'85px',
                  display:'flex',
                  alignItems:'center',
                  boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
                  transition:'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)';
                }}
              >
                {announcement}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* תוכן ראשי עם margin-right ללוח מודעות */}
      <div style={{marginRight:'300px'}}>
      <header style={{
        background:'linear-gradient(135deg, #4a7c59 0%, #3d6b4a 30%, #2f4f3f 60%, #1a3328 100%)', 
        color:'white', 
        padding:'90px 30px', 
        boxShadow:'0 8px 32px rgba(0,0,0,0.25)',
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center', 
        gap:'25px',
        position:'relative',
        overflow:'hidden',
        borderBottom:'4px solid rgba(255, 193, 7, 0.3)'
      }}>
        <div style={{
          position:'absolute',
          top:0,
          left:0,
          right:0,
          bottom:0,
          background:'radial-gradient(circle at 20% 30%, rgba(139, 195, 74, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 193, 7, 0.1) 0%, transparent 40%)',
          pointerEvents:'none'
        }}></div>
        <div style={{
          position:'absolute',
          top:0,
          left:0,
          right:0,
          bottom:0,
          backgroundImage:'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity:0.3,
          pointerEvents:'none'
        }}></div>
        <motion.img 
          src="/logo.png" 
          alt="לוגו מושב לבנים" 
          initial={{opacity:0, scale:0.8}}
          animate={{opacity:1, scale:1}}
          transition={{duration:0.6}}
          style={{
            height:'140px', 
            width:'auto',
            filter:'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
            position:'relative',
            zIndex:1
          }} 
        />
        <motion.h1 
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay:0.2, duration:0.6}}
          style={{
            margin:0, 
            color:'white', 
            fontSize:'52px', 
            fontWeight:'bold', 
            textAlign:'center',
            textShadow:'0 4px 12px rgba(0,0,0,0.4)',
            letterSpacing:'2px',
            position:'relative',
            zIndex:1
          }}
        >
          מושב לבנים
        </motion.h1>
        <motion.div 
          initial={{opacity:0,y:20}} 
          animate={{opacity:1,y:0}}
          transition={{delay:0.4, duration:0.6}}
          style={{textAlign:'center', marginTop:'25px', position:'relative', zIndex:1}}
        >
          <h2 style={{
            margin:'0 0 18px 0', 
            fontSize:'38px', 
            fontWeight:'400',
            textShadow:'0 2px 8px rgba(0,0,0,0.3)',
            letterSpacing:'1px',
            color:'#fff8e1'
          }}>
            ברוכים הבאים למושב לבנים
          </h2>
          <p style={{
            margin:0, 
            fontSize:'22px',
            opacity:0.95,
            textShadow:'0 2px 4px rgba(0,0,0,0.2)',
            color:'#f1f8e9',
            lineHeight:'1.6'
          }}>
            🌾 מושב חקלאי עם צימרים, קהילה חמה ומשפחות צעירות 🌾
          </p>
        </motion.div>
      </header>

      <section style={{
        display:'flex', 
        justifyContent:'center', 
        gap:'25px', 
        padding:'60px 40px', 
        flexWrap:'wrap', 
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #f8f6f0 100%)',
        position:'relative',
        borderBottom:'1px solid rgba(139, 195, 74, 0.2)'
      }}>
        <div 
          onClick={() => scrollToSection('events-section')}
          style={{
            display:'flex', 
            alignItems:'center', 
            gap:'10px', 
            fontSize:'18px', 
            color:'#2f4f3f', 
            padding:'18px 30px', 
            background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
            borderRadius:'14px', 
            boxShadow:'0 4px 16px rgba(139, 195, 74, 0.15), 0 2px 8px rgba(47, 79, 63, 0.1)', 
            cursor:'pointer', 
            transition:'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border:'2px solid rgba(139, 195, 74, 0.2)',
            fontWeight:'500'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 195, 74, 0.25), 0 4px 12px rgba(47, 79, 63, 0.15)';
            e.currentTarget.style.borderColor = '#8bc34a';
            e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #fefcf8 100%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 195, 74, 0.15), 0 2px 8px rgba(47, 79, 63, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
            e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)';
          }}>
          <Calendar size={24} color="#2f4f3f"/> לוח אירועים
        </div>
        <div 
          ref={archiveMenuRef}
          style={{position:'relative', display:'inline-block'}}
        >
          <div 
            onClick={() => setIsArchiveMenuOpen(!isArchiveMenuOpen)}
            style={{...buttonStyle}}
            onMouseEnter={buttonHoverEnter}
            onMouseLeave={buttonHoverLeave}>
            <Archive size={24} color="#2f4f3f"/> ארכיון
            <ChevronDown size={18} style={{transform: isArchiveMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.3s ease'}}/>
          </div>
          
          {isArchiveMenuOpen && (
            <motion.div
              initial={{opacity:0, y:-10}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-10}}
              style={{
                position:'absolute',
                top:'100%',
                right:0,
                marginTop:'8px',
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                borderRadius:'14px',
                boxShadow:'0 8px 24px rgba(139, 195, 74, 0.2), 0 4px 12px rgba(47, 79, 63, 0.15)',
                minWidth:'220px',
                zIndex:1000,
                border:'2px solid rgba(139, 195, 74, 0.25)',
                backdropFilter:'blur(10px)'
              }}
            >
              <div style={{padding:'8px 0'}}>
                <div
                  onClick={() => {
                    scrollToSection('archive-photos');
                    setIsArchiveMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  📷 תמונות
                </div>
                <div
                  onClick={() => {
                    scrollToSection('archive-videos');
                    setIsArchiveMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  🎥 וידאו
                </div>
                <div
                  onClick={() => {
                    scrollToSection('archive-articles');
                    setIsArchiveMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  📰 כתבות
                </div>
                <div
                  onClick={() => {
                    scrollToSection('archive-social');
                    setIsArchiveMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  🌐 לבנים ברשת
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div 
          onClick={() => scrollToSection('volunteering-section')}
          style={{...buttonStyle}}
          onMouseEnter={buttonHoverEnter}
          onMouseLeave={buttonHoverLeave}>
          <Users size={24} color="#2f4f3f"/> התנדבות
        </div>
        <div 
          onClick={() => scrollToSection('contact-section')}
          style={{...buttonStyle}}
          onMouseEnter={buttonHoverEnter}
          onMouseLeave={buttonHoverLeave}>
          <MessageCircle size={24} color="#2f4f3f"/> פורום תושבים
        </div>
        <div 
          onClick={() => scrollToSection('contact-email-section')}
          style={{...buttonStyle}}
          onMouseEnter={buttonHoverEnter}
          onMouseLeave={buttonHoverLeave}>
          <Mail size={24} color="#2f4f3f"/> פניות תושבים
        </div>
        <div 
          ref={realEstateMenuRef}
          style={{position:'relative', display:'inline-block'}}
        >
          <div 
            onClick={() => setIsRealEstateMenuOpen(!isRealEstateMenuOpen)}
            style={{...buttonStyle}}
            onMouseEnter={buttonHoverEnter}
            onMouseLeave={buttonHoverLeave}>
            <Home size={24} color="#2f4f3f"/> נדל"ן
            <ChevronDown size={18} style={{transform: isRealEstateMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.3s ease'}}/>
          </div>
          
          {isRealEstateMenuOpen && (
            <motion.div
              initial={{opacity:0, y:-10}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-10}}
              style={{
                position:'absolute',
                top:'100%',
                right:0,
                marginTop:'8px',
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                borderRadius:'14px',
                boxShadow:'0 8px 24px rgba(139, 195, 74, 0.2), 0 4px 12px rgba(47, 79, 63, 0.15)',
                minWidth:'220px',
                zIndex:1000,
                border:'2px solid rgba(139, 195, 74, 0.25)',
                backdropFilter:'blur(10px)'
              }}
            >
              <div style={{padding:'8px 0'}}>
                <div
                  onClick={() => {
                    scrollToSection('real-estate-rent');
                    setIsRealEstateMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  🏠 להשכרה
                </div>
                <div
                  onClick={() => {
                    scrollToSection('real-estate-sale');
                    setIsRealEstateMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  💰 מכירה
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div 
          ref={coursesMenuRef}
          style={{position:'relative', display:'inline-block'}}
        >
          <div 
            onClick={() => setIsCoursesMenuOpen(!isCoursesMenuOpen)}
            style={{...buttonStyle}}
            onMouseEnter={buttonHoverEnter}
            onMouseLeave={buttonHoverLeave}>
            <BookOpen size={24} color="#2f4f3f"/> חוגים
            <ChevronDown size={18} style={{transform: isCoursesMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.3s ease'}}/>
          </div>
          
          {isCoursesMenuOpen && (
            <motion.div
              initial={{opacity:0, y:-10}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-10}}
              style={{
                position:'absolute',
                top:'100%',
                right:0,
                marginTop:'8px',
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                borderRadius:'14px',
                boxShadow:'0 8px 24px rgba(139, 195, 74, 0.2), 0 4px 12px rgba(47, 79, 63, 0.15)',
                minWidth:'220px',
                zIndex:1000,
                border:'2px solid rgba(139, 195, 74, 0.25)',
                backdropFilter:'blur(10px)'
              }}
            >
              <div style={{padding:'8px 0'}}>
                <div
                  onClick={() => {
                    scrollToSection('courses-children');
                    setIsCoursesMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  👶 ילדים
                </div>
                <div
                  onClick={() => {
                    scrollToSection('courses-youth');
                    setIsCoursesMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  🎯 נוער
                </div>
                <div
                  onClick={() => {
                    scrollToSection('courses-adults');
                    setIsCoursesMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  👨‍💼 מבוגרים
                </div>
                <div
                  onClick={() => {
                    scrollToSection('courses-seniors');
                    setIsCoursesMenuOpen(false);
                  }}
                  style={{
                    padding:'12px 20px',
                    cursor:'pointer',
                    transition:'background 0.2s ease',
                    color:'#333'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  👴 60+
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section style={{background:'white', padding:'40px', position:'relative'}}>
        <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-start', marginBottom:'30px', position:'relative', width:'100%', paddingRight:0}}>
          <div ref={menuRef} style={{position:'relative', display:'inline-block', marginRight:0, marginLeft:'auto'}}>
            <button
              onClick={() => setIsBusinessMenuOpen(!isBusinessMenuOpen)}
              style={{
                display:'flex',
                alignItems:'center',
                gap:'10px',
                padding:'16px 28px',
                background:'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)',
                color:'white',
                border:'none',
                borderRadius:'12px',
                cursor:'pointer',
                fontSize:'17px',
                fontWeight:'bold',
                boxShadow:'0 6px 20px rgba(47, 79, 63, 0.3)',
                transition:'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow:'0 2px 4px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #3a5f4f 0%, #2f4f3f 100%)';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 24px rgba(47, 79, 63, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 6px 20px rgba(47, 79, 63, 0.3)';
              }}
            >
              <Store size={20}/>
              עסקים במושב
              <ChevronDown size={18} style={{transform: isBusinessMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.3s ease'}}/>
            </button>
            
            {isBusinessMenuOpen && (
              <motion.div
                initial={{opacity:0, y:-10}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y:-10}}
                style={{
                  position:'absolute',
                  top:'100%',
                  right:0,
                  marginTop:'8px',
                  background:'white',
                  borderRadius:'8px',
                  boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
                  minWidth:'200px',
                  zIndex:1000,
                  border:'1px solid #e0e0e0'
                }}
              >
                <div style={{padding:'8px 0'}}>
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <div
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsBusinessMenuOpen(false);
                        }}
                        style={{
                          display:'flex',
                          alignItems:'center',
                          gap:'10px',
                          padding:'12px 20px',
                          cursor:'pointer',
                          transition:'background 0.2s ease',
                          color: selectedCategory === category.id ? '#2f4f3f' : '#333',
                          fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
                          background: selectedCategory === category.id ? '#f0f0f0' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCategory !== category.id) {
                            e.target.style.background = '#f9f9f9';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCategory !== category.id) {
                            e.target.style.background = 'transparent';
                          }
                        }}
                      >
                        <IconComponent size={18}/>
                        {category.name}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div style={{marginTop:'30px'}}>
          <h4 style={{margin:'0 0 20px 0', color:'#2f4f3f', fontSize:'20px', fontWeight:'bold'}}>
            רשימת קטגוריות
          </h4>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'15px'}}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <div key={category.id}>
                  <div
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      display:'flex',
                      alignItems:'center',
                      gap:'10px',
                      padding:'15px',
                      background: isSelected ? '#2f4f3f' : 'white',
                      color: isSelected ? 'white' : '#333',
                      borderRadius:'8px',
                      border:`2px solid ${isSelected ? '#2f4f3f' : '#e0e0e0'}`,
                      cursor:'pointer',
                      transition:'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 8px rgba(47, 79, 63, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#2f4f3f';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#e0e0e0';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                      }
                    }}
                  >
                    <IconComponent size={20} color={isSelected ? 'white' : '#2f4f3f'}/>
                    <span style={{fontWeight: isSelected ? 'bold' : 'normal'}}>{category.name}</span>
                  </div>
                  
                  {isSelected && businesses[category.id] && (
                    <motion.div
                      initial={{opacity:0, height:0}}
                      animate={{opacity:1, height:'auto'}}
                      exit={{opacity:0, height:0}}
                      style={{
                        marginTop:'20px',
                        padding:'20px',
                        background:'#f9f9f9',
                        borderRadius:'8px',
                        border:'1px solid #e0e0e0'
                      }}
                    >
                      <h5 style={{margin:'0 0 15px 0', color:'#2f4f3f', fontSize:'18px', fontWeight:'bold'}}>
                        עסקים בקטגוריה: {category.name}
                      </h5>
                      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'15px'}}>
                        {businesses[category.id].map((business) => (
                          <motion.div
                            key={business.id}
                            initial={{opacity:0, y:10}}
                            animate={{opacity:1, y:0}}
                            transition={{delay: business.id * 0.1}}
                            style={{
                              background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                              borderRadius:'18px',
                              border:'2px solid rgba(139, 195, 74, 0.2)',
                              boxShadow:'0 6px 24px rgba(139, 195, 74, 0.15), 0 2px 12px rgba(47, 79, 63, 0.1)',
                              transition:'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              overflow:'hidden'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = '0 12px 36px rgba(139, 195, 74, 0.25), 0 4px 16px rgba(47, 79, 63, 0.15)';
                              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                              e.currentTarget.style.borderColor = '#8bc34a';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '0 6px 24px rgba(139, 195, 74, 0.15), 0 2px 12px rgba(47, 79, 63, 0.1)';
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
                            }}
                          >
                            <img 
                              src={business.image} 
                              alt={business.name}
                              style={{
                                width:'100%',
                                height:'220px',
                                objectFit:'cover',
                                display:'block',
                                transition:'transform 0.3s ease'
                              }}
                              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(business.name);
                              }}
                            />
                            <div style={{padding:'15px'}}>
                              <h6 style={{margin:'0 0 10px 0', color:'#2f4f3f', fontSize:'16px', fontWeight:'bold'}}>
                                {business.name}
                              </h6>
                              <div style={{display:'flex', flexDirection:'column', gap:'8px', fontSize:'14px', color:'#666', marginBottom:'12px'}}>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                  <Phone size={16} color="#2f4f3f"/>
                                  <span>{business.phone}</span>
                                </div>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                  <Mail size={16} color="#2f4f3f"/>
                                  <span>{business.email}</span>
                                </div>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                  <MapPin size={16} color="#2f4f3f"/>
                                  <span>{business.address}</span>
                                </div>
                              </div>
                              <a
                                href={getWhatsAppLink(business.whatsapp || business.phone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display:'flex',
                                  alignItems:'center',
                                  justifyContent:'center',
                                  gap:'8px',
                                  padding:'10px 15px',
                                  background:'#25D366',
                                  color:'white',
                                  borderRadius:'6px',
                                  textDecoration:'none',
                                  fontSize:'14px',
                                  fontWeight:'bold',
                                  transition:'all 0.2s ease',
                                  marginTop:'8px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#20BA5A';
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#25D366';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                שלח הודעה בוואטסאפ
                              </a>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* סקשן לוח אירועים */}
      <section id="events-section" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px',
        position:'relative'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          📅 לוח אירועים
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { title: "ישיבת ועד", date: "יום ראשון, 20:00", location: "בית העם" },
            { title: "אירוע קהילתי", date: "שבת, 18:00", location: "הגן הציבורי" },
            { title: "יום ניקיון", date: "יום רביעי, 08:00", location: "כל המושב" },
            { title: "הרצאה - גינון", date: "יום חמישי, 19:00", location: "בית העם" },
          ].map((event, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(139, 195, 74, 0.25), 0 4px 14px rgba(47, 79, 63, 0.15)';
                e.currentTarget.style.borderColor = '#8bc34a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
              }}
            >
              <h3 style={{color:'#2f4f3f', margin:'0 0 10px 0'}}>{event.title}</h3>
              <p style={{color:'#666', margin:'5px 0'}}>📅 {event.date}</p>
              <p style={{color:'#666', margin:'5px 0'}}>📍 {event.location}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן ארכיון - תמונות */}
      <section id="archive-photos" style={{
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          📷 ארכיון תמונות
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[1,2,3,4,5,6].map((num) => (
            <motion.div 
              key={num}
              initial={{opacity:0, scale:0.9}}
              animate={{opacity:1, scale:1}}
              transition={{delay: num * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                padding:'20px',
                borderRadius:'12px',
                boxShadow:'0 4px 12px rgba(47, 79, 63, 0.1)',
                textAlign:'center',
                minHeight:'220px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                color:'#999',
                border:'2px solid rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 63, 0.15)';
                e.currentTarget.style.borderColor = '#2f4f3f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(47, 79, 63, 0.1)';
              }}
            >
              תמונה {num}
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן ארכיון - וידאו */}
      <section id="archive-videos" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          🎥 ארכיון וידאו
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[1,2,3,4].map((num) => (
            <div key={num} style={{
              background:'#f9f9f9',
              padding:'15px',
              borderRadius:'8px',
              boxShadow:'0 2px 4px rgba(0,0,0,0.05)',
              textAlign:'center',
              minHeight:'200px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              color:'#999'
            }}>
              סרטון {num}
            </div>
          ))}
        </div>
      </section>

      {/* סקשן ארכיון - כתבות */}
      <section id="archive-articles" style={{
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          📰 ארכיון כתבות
        </h2>
        <div style={{display:'flex', flexDirection:'column', gap:'20px', maxWidth:'800px', margin:'0 auto'}}>
          {[
            { title: "חגיגת יום העצמאות במושב", date: "15.05.2024" },
            { title: "פתיחת גן שעשועים חדש", date: "10.04.2024" },
            { title: "יום ניקיון קהילתי", date: "05.03.2024" },
            { title: "אירוע תרבות - ערב שירה", date: "20.02.2024" },
          ].map((article, index) => (
            <div key={index} style={{
              background:'white',
              padding:'20px',
              borderRadius:'8px',
              boxShadow:'0 2px 4px rgba(0,0,0,0.05)',
              borderRight:'4px solid #2f4f3f'
            }}>
              <h3 style={{color:'#2f4f3f', margin:'0 0 10px 0'}}>{article.title}</h3>
              <p style={{color:'#666', margin:0}}>📅 {article.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* סקשן ארכיון - לבנים ברשת */}
      <section id="archive-social" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          🌐 לבנים ברשת
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { platform: "פייסבוק", link: "facebook.com/levavim" },
            { platform: "אינסטגרם", link: "instagram.com/levavim" },
            { platform: "טוויטר", link: "twitter.com/levavim" },
            { platform: "יוטיוב", link: "youtube.com/levavim" },
          ].map((social, index) => (
            <div key={index} style={{
              background:'#f9f9f9',
              padding:'20px',
              borderRadius:'8px',
              boxShadow:'0 2px 4px rgba(0,0,0,0.05)',
              textAlign:'center'
            }}>
              <h3 style={{color:'#2f4f3f', margin:'0 0 10px 0'}}>{social.platform}</h3>
              <p style={{color:'#666', margin:0}}>{social.link}</p>
            </div>
          ))}
        </div>
      </section>

      {/* סקשן התנדבות */}
      <section id="volunteering-section" style={{
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          🤝 התנדבות
        </h2>
        <div style={{
          maxWidth:'800px', 
          margin:'0 auto', 
          background:'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)', 
          padding:'50px', 
          borderRadius:'16px', 
          boxShadow:'0 8px 24px rgba(47, 79, 63, 0.12)',
          border:'2px solid rgba(47, 79, 63, 0.1)'
        }}>
          <p style={{color:'#666', fontSize:'18px', lineHeight:'1.8', marginBottom:'20px'}}>
            המושב שלנו מתבסס על קהילה חזקה ותומכת. אנו מזמינים את כל התושבים להצטרף לפעילויות התנדבותיות.
          </p>
          <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
            {[
              "ניקיון סביבתי - כל יום רביעי",
              "עזרה לקשישים - לפי צורך",
              "ארגון אירועים קהילתיים",
              "תמיכה בפעילויות ילדים",
            ].map((activity, index) => (
              <motion.div 
                key={index}
                initial={{opacity:0, x:20}}
                animate={{opacity:1, x:0}}
                transition={{delay: index * 0.1}}
                style={{
                  padding:'20px',
                  background:'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                  borderRadius:'10px',
                  borderRight:'4px solid #2f4f3f',
                  boxShadow:'0 2px 8px rgba(47, 79, 63, 0.1)',
                  transition:'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 63, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(47, 79, 63, 0.1)';
                }}
              >
                ✓ {activity}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* סקשן נדל"ן - להשכרה */}
      <section id="real-estate-rent" style={{
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          🏠 נדל"ן להשכרה
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { title: "בית 4 חדרים", price: "5,000 ₪", location: "רחוב הראשונים 10", rooms: "4 חדרים", size: "120 מ\"ר", name: "יוסי כהן", phone: "050-1111111", whatsapp: "0501111111" },
            { title: "דירת 3 חדרים", price: "4,000 ₪", location: "רחוב הטבע 5", rooms: "3 חדרים", size: "90 מ\"ר", name: "שרה לוי", phone: "050-2222222", whatsapp: "0502222222" },
            { title: "בית עם גינה", price: "6,500 ₪", location: "רחוב השדות 8", rooms: "5 חדרים", size: "150 מ\"ר", name: "דוד ישראלי", phone: "050-3333333", whatsapp: "0503333333" },
            { title: "דירת 2 חדרים", price: "3,200 ₪", location: "רחוב השלום 3", rooms: "2 חדרים", size: "70 מ\"ר", name: "רונית דוד", phone: "050-4444444", whatsapp: "0504444444" },
          ].map((property, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 63, 0.2)';
                e.currentTarget.style.borderColor = '#2f4f3f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(47, 79, 63, 0.1)';
              }}
            >
              <h3 style={{
                color:'#2f4f3f', 
                margin:'0 0 12px 0',
                fontSize:'20px',
                fontWeight:'bold'
              }}>
                {property.title}
              </h3>
              <p style={{
                color:'#2f4f3f', 
                fontSize:'24px', 
                fontWeight:'bold', 
                margin:'12px 0',
                background:'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor:'transparent',
                backgroundClip:'text'
              }}>
                {property.price}
              </p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>📍 {property.location}</p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>🛏️ {property.rooms}</p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>📐 {property.size}</p>
              <div style={{
                marginTop:'15px',
                paddingTop:'15px',
                borderTop:'1px solid rgba(47, 79, 63, 0.2)'
              }}>
                <p style={{color:'#2f4f3f', margin:'8px 0', fontSize:'15px', fontWeight:'bold'}}>
                  👤 {property.name}
                </p>
                <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>
                  📞 {property.phone}
                </p>
                <a
                  href={getWhatsAppLink(property.whatsapp || property.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'8px',
                    padding:'10px 15px',
                    background:'#25D366',
                    color:'white',
                    borderRadius:'8px',
                    textDecoration:'none',
                    fontSize:'14px',
                    fontWeight:'bold',
                    transition:'all 0.2s ease',
                    marginTop:'10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#20BA5A';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#25D366';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  שלח הודעה בוואטסאפ
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן נדל"ן - מכירה */}
      <section id="real-estate-sale" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          💰 נדל"ן למכירה
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { title: "בית פרטי עם גינה", price: "2,500,000 ₪", location: "רחוב הראשונים 15", rooms: "5 חדרים", size: "180 מ\"ר", name: "מיכל כהן", phone: "050-5555555", whatsapp: "0505555555" },
            { title: "דירת 4 חדרים", price: "1,800,000 ₪", location: "רחוב הטבע 12", rooms: "4 חדרים", size: "110 מ\"ר", name: "אבי לוי", phone: "050-6666666", whatsapp: "0506666666" },
            { title: "בית קרקע", price: "3,200,000 ₪", location: "רחוב השדות 20", rooms: "6 חדרים", size: "250 מ\"ר", name: "טל ישראלי", phone: "050-7777777", whatsapp: "0507777777" },
            { title: "דירת 3 חדרים", price: "1,400,000 ₪", location: "רחוב השלום 7", rooms: "3 חדרים", size: "95 מ\"ר", name: "נועה דוד", phone: "050-8888888", whatsapp: "0508888888" },
          ].map((property, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(139, 195, 74, 0.25), 0 4px 14px rgba(47, 79, 63, 0.15)';
                e.currentTarget.style.borderColor = '#8bc34a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
              }}
            >
              <h3 style={{color:'#2f4f3f', margin:'0 0 10px 0'}}>{property.title}</h3>
              <p style={{color:'#2f4f3f', fontSize:'20px', fontWeight:'bold', margin:'10px 0'}}>{property.price}</p>
              <p style={{color:'#666', margin:'5px 0'}}>📍 {property.location}</p>
              <p style={{color:'#666', margin:'5px 0'}}>🛏️ {property.rooms}</p>
              <p style={{color:'#666', margin:'5px 0'}}>📐 {property.size}</p>
              <div style={{
                marginTop:'15px',
                paddingTop:'15px',
                borderTop:'1px solid rgba(47, 79, 63, 0.2)'
              }}>
                <p style={{color:'#2f4f3f', margin:'8px 0', fontSize:'15px', fontWeight:'bold'}}>
                  👤 {property.name}
                </p>
                <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>
                  📞 {property.phone}
                </p>
                <a
                  href={getWhatsAppLink(property.whatsapp || property.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'8px',
                    padding:'10px 15px',
                    background:'#25D366',
                    color:'white',
                    borderRadius:'8px',
                    textDecoration:'none',
                    fontSize:'14px',
                    fontWeight:'bold',
                    transition:'all 0.2s ease',
                    marginTop:'10px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#20BA5A';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#25D366';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  שלח הודעה בוואטסאפ
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן חוגים - ילדים */}
      <section id="courses-children" style={{
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          👶 חוגים לילדים
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { name: "חוג ציור ויצירה", age: "5-10", day: "יום ראשון", time: "16:00-17:30", instructor: "שרה כהן" },
            { name: "חוג ספורט", age: "6-12", day: "יום שני", time: "17:00-18:00", instructor: "דוד לוי" },
            { name: "חוג מוזיקה", age: "7-14", day: "יום שלישי", time: "16:30-18:00", instructor: "רונית ישראלי" },
            { name: "חוג ריקוד", age: "5-12", day: "יום רביעי", time: "17:00-18:00", instructor: "מיכל דוד" },
          ].map((course, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 63, 0.2)';
                e.currentTarget.style.borderColor = '#2f4f3f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(47, 79, 63, 0.1)';
              }}
            >
              <h3 style={{
                color:'#2f4f3f', 
                margin:'0 0 12px 0',
                fontSize:'20px',
                fontWeight:'bold'
              }}>
                {course.name}
              </h3>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>👥 גילאים: {course.age}</p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>📅 {course.day}, {course.time}</p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>👨‍🏫 מדריך: {course.instructor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן חוגים - נוער */}
      <section id="courses-youth" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          🎯 חוגים לנוער
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { name: "חוג תכנות", age: "13-18", day: "יום ראשון", time: "18:00-19:30", instructor: "יוסי כהן" },
            { name: "חוג כדורגל", age: "12-17", day: "יום שני", time: "18:00-19:30", instructor: "משה לוי" },
            { name: "חוג תיאטרון", age: "14-18", day: "יום שלישי", time: "18:00-20:00", instructor: "אבי ישראלי" },
            { name: "חוג צילום", age: "13-18", day: "יום רביעי", time: "17:30-19:00", instructor: "רמי דוד" },
          ].map((course, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(139, 195, 74, 0.25), 0 4px 14px rgba(47, 79, 63, 0.15)';
                e.currentTarget.style.borderColor = '#8bc34a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
              }}
            >
              <h3 style={{color:'#2f4f3f', margin:'0 0 10px 0'}}>{course.name}</h3>
              <p style={{color:'#666', margin:'5px 0'}}>👥 גילאים: {course.age}</p>
              <p style={{color:'#666', margin:'5px 0'}}>📅 {course.day}, {course.time}</p>
              <p style={{color:'#666', margin:'5px 0'}}>👨‍🏫 מדריך: {course.instructor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן חוגים - מבוגרים */}
      <section id="courses-adults" style={{
        background:'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          👨‍💼 חוגים למבוגרים
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { name: "חוג יוגה", age: "18+", day: "יום ראשון", time: "19:00-20:30", instructor: "שרה כהן" },
            { name: "חוג בישול", age: "18+", day: "יום שני", time: "19:00-21:00", instructor: "דוד לוי" },
            { name: "חוג צילום", age: "18+", day: "יום שלישי", time: "19:00-21:00", instructor: "רונית ישראלי" },
            { name: "חוג פילאטיס", age: "18+", day: "יום רביעי", time: "19:30-21:00", instructor: "מיכל דוד" },
          ].map((course, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 63, 0.2)';
                e.currentTarget.style.borderColor = '#2f4f3f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(47, 79, 63, 0.1)';
              }}
            >
              <h3 style={{
                color:'#2f4f3f', 
                margin:'0 0 12px 0',
                fontSize:'20px',
                fontWeight:'bold'
              }}>
                {course.name}
              </h3>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>👥 גילאים: {course.age}</p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>📅 {course.day}, {course.time}</p>
              <p style={{color:'#666', margin:'8px 0', fontSize:'15px'}}>👨‍🏫 מדריך: {course.instructor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן חוגים - 60+ */}
      <section id="courses-seniors" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'400px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'42px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing:'1.5px',
          background:'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          backgroundClip:'text'
        }}>
          👴 חוגים ל-60+
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
          {[
            { name: "חוג ברידג'", age: "60+", day: "יום ראשון", time: "14:00-16:00", instructor: "יוסי כהן" },
            { name: "חוג התעמלות", age: "60+", day: "יום שני", time: "10:00-11:30", instructor: "משה לוי" },
            { name: "חוג שירה בציבור", age: "60+", day: "יום שלישי", time: "15:00-17:00", instructor: "אבי ישראלי" },
            { name: "חוג מחשבים", age: "60+", day: "יום רביעי", time: "14:00-16:00", instructor: "רמי דוד" },
          ].map((course, index) => (
            <motion.div
              key={index}
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay: index * 0.1}}
              style={{
                background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
                padding:'25px',
                borderRadius:'16px',
                border:'2px solid rgba(139, 195, 74, 0.2)',
                boxShadow:'0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)',
                transition:'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(139, 195, 74, 0.25), 0 4px 14px rgba(47, 79, 63, 0.15)';
                e.currentTarget.style.borderColor = '#8bc34a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 195, 74, 0.15), 0 2px 10px rgba(47, 79, 63, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(139, 195, 74, 0.2)';
              }}
            >
              <h3 style={{color:'#2f4f3f', margin:'0 0 10px 0'}}>{course.name}</h3>
              <p style={{color:'#666', margin:'5px 0'}}>👥 גילאים: {course.age}</p>
              <p style={{color:'#666', margin:'5px 0'}}>📅 {course.day}, {course.time}</p>
              <p style={{color:'#666', margin:'5px 0'}}>👨‍🏫 מדריך: {course.instructor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* סקשן פניות תושבים - פורום */}
      <section id="contact-section" style={{
        background:'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)', 
        padding:'80px 40px', 
        minHeight:'500px', 
        scrollMarginTop:'80px'
      }}>
        <h2 style={{
          color:'#2f4f3f', 
          fontSize:'38px', 
          marginBottom:'50px', 
          textAlign:'center',
          fontWeight:'bold',
          textShadow:'0 2px 4px rgba(0,0,0,0.1)',
          letterSpacing:'1px'
        }}>
          💬 פורום תושבים
        </h2>
        
        <div style={{maxWidth:'900px', margin:'0 auto'}}>
          {/* טופס כתיבת הודעה חדשה */}
          <div style={{
            background:'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)', 
            padding:'35px', 
            borderRadius:'16px', 
            boxShadow:'0 8px 24px rgba(47, 79, 63, 0.12)', 
            marginBottom:'40px',
            border:'2px solid rgba(47, 79, 63, 0.1)'
          }}>
            <h3 style={{color:'#2f4f3f', marginBottom:'20px', fontSize:'24px'}}>כתוב הודעה חדשה:</h3>
            <form onSubmit={handleContactSubmit}>
              <div style={{marginBottom:'15px'}}>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="שם מלא *"
                  required
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{marginBottom:'15px'}}>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="אימייל *"
                  required
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{marginBottom:'15px'}}>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="כתוב את ההודעה שלך כאן... *"
                  required
                  rows="4"
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    resize:'vertical',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding:'16px 40px',
                  background:'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)',
                  color:'white',
                  border:'none',
                  borderRadius:'12px',
                  fontSize:'18px',
                  fontWeight:'bold',
                  cursor:'pointer',
                  transition:'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow:'0 6px 20px rgba(47, 79, 63, 0.3)',
                  textShadow:'0 2px 4px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #3a5f4f 0%, #2f4f3f 100%)';
                  e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  e.target.style.boxShadow = '0 8px 24px rgba(47, 79, 63, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 6px 20px rgba(47, 79, 63, 0.3)';
                }}
              >
                שלח
              </button>
            </form>
          </div>

          {/* רשימת הודעות בפורום */}
          <div>
            <h3 style={{color:'#2f4f3f', marginBottom:'20px', fontSize:'24px'}}>הודעות בפורום:</h3>
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              {forumPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{opacity:0, y:10}}
                  animate={{opacity:1, y:0}}
                  style={{
                    background:'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                    padding:'25px',
                    borderRadius:'12px',
                    border:'2px solid rgba(47, 79, 63, 0.1)',
                    boxShadow:'0 4px 12px rgba(47, 79, 63, 0.1)',
                    transition:'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(47, 79, 63, 0.15)';
                    e.currentTarget.style.borderColor = '#2f4f3f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(47, 79, 63, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(47, 79, 63, 0.1)';
                  }}
                >
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                    <div>
                      <strong style={{color:'#2f4f3f', fontSize:'18px'}}>{post.name}</strong>
                      <span style={{color:'#999', fontSize:'14px', marginRight:'10px'}}> ({post.email})</span>
                    </div>
                    <span style={{color:'#999', fontSize:'14px'}}>{post.date}</span>
                  </div>
                  <p style={{color:'#666', fontSize:'16px', lineHeight:'1.6', margin:0}}>{post.message}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* סקשן פניות תושבים - שליחת מייל */}
      <section id="contact-email-section" style={{background:'white', padding:'60px 40px', minHeight:'500px', scrollMarginTop:'80px'}}>
        <h2 style={{color:'#2f4f3f', fontSize:'32px', marginBottom:'30px', textAlign:'center'}}>
          📧 פניות תושבים
        </h2>
        
        <div style={{maxWidth:'700px', margin:'0 auto', background:'#f9f9f9', padding:'40px', borderRadius:'8px', boxShadow:'0 2px 4px rgba(0,0,0,0.05)'}}>
          {emailSent ? (
            <motion.div
              initial={{opacity:0, scale:0.9}}
              animate={{opacity:1, scale:1}}
              style={{
                textAlign:'center',
                padding:'40px',
                background:'#2f4f3f',
                color:'white',
                borderRadius:'8px'
              }}
            >
              <h3 style={{margin:'0 0 10px 0', fontSize:'24px'}}>✅ המייל נשלח בהצלחה!</h3>
              <p style={{margin:0, fontSize:'16px'}}>תוכנת המייל נפתחה. אנא שלח את המייל</p>
            </motion.div>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block', color:'#2f4f3f', marginBottom:'8px', fontWeight:'bold'}}>
                  שם מלא *
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactEmailForm.name}
                  onChange={handleEmailFormChange}
                  required
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block', color:'#2f4f3f', marginBottom:'8px', fontWeight:'bold'}}>
                  אימייל *
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactEmailForm.email}
                  onChange={handleEmailFormChange}
                  required
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{marginBottom:'20px'}}>
                <label style={{display:'block', color:'#2f4f3f', marginBottom:'8px', fontWeight:'bold'}}>
                  נושא
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactEmailForm.subject}
                  onChange={handleEmailFormChange}
                  placeholder="נושא הפנייה (אופציונלי)"
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{marginBottom:'25px'}}>
                <label style={{display:'block', color:'#2f4f3f', marginBottom:'8px', fontWeight:'bold'}}>
                  הודעה *
                </label>
                <textarea
                  name="message"
                  value={contactEmailForm.message}
                  onChange={handleEmailFormChange}
                  required
                  rows="8"
                  placeholder="כתוב את ההודעה שלך כאן..."
                  style={{
                    width:'100%',
                    padding:'14px 16px',
                    borderRadius:'10px',
                    border:'2px solid rgba(47, 79, 63, 0.2)',
                    fontSize:'16px',
                    fontFamily:'Arial',
                    resize:'vertical',
                    background:'#ffffff',
                    transition:'all 0.3s ease',
                    outline:'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2f4f3f';
                    e.target.style.boxShadow = '0 0 0 3px rgba(47, 79, 63, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(47, 79, 63, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width:'100%',
                  padding:'18px',
                  background:'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)',
                  color:'white',
                  border:'none',
                  borderRadius:'12px',
                  fontSize:'18px',
                  fontWeight:'bold',
                  cursor:'pointer',
                  transition:'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow:'0 6px 20px rgba(47, 79, 63, 0.3)',
                  textShadow:'0 2px 4px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #3a5f4f 0%, #2f4f3f 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(47, 79, 63, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #2f4f3f 0%, #1a3328 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(47, 79, 63, 0.3)';
                }}
              >
                שלח מייל
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={{
        background:'linear-gradient(135deg, #4a7c59 0%, #3d6b4a 30%, #2f4f3f 70%, #1a3328 100%)', 
        color:'white', 
        padding:'50px 20px', 
        textAlign:'center',
        boxShadow:'0 -4px 24px rgba(0,0,0,0.25)',
        position:'relative',
        borderTop:'4px solid rgba(255, 193, 7, 0.3)'
      }}>
        <div style={{
          maxWidth:'1200px',
          margin:'0 auto',
          display:'flex',
          flexDirection:'column',
          gap:'15px'
        }}>
          <p style={{
            margin:'5px 0',
            fontSize:'16px',
            textShadow:'0 2px 4px rgba(0,0,0,0.3)'
          }}>
            📧 לפניות לוועד: <a href="mailto:vaad@levavim.co.il" style={{color:'white', textDecoration:'underline'}}>vaad@levavim.co.il</a>
          </p>
          <p style={{
            margin:'5px 0',
            fontSize:'16px',
            textShadow:'0 2px 4px rgba(0,0,0,0.3)'
          }}>
            📞 טלפון מזכירות: 04-0000000
          </p>
          <div style={{
            marginTop:'20px',
            paddingTop:'20px',
            borderTop:'1px solid rgba(255,255,255,0.2)',
            fontSize:'14px',
            opacity:0.9
          }}>
            © 2024 מושב לבנים - כל הזכויות שמורות
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
