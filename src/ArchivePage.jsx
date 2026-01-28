import React from "react";
import { motion } from "framer-motion";
import { Link, Home } from "lucide-react";

export default function ArchivePage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)" }}>
      {/* Header with back button */}
      <header style={{
        background: 'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
        padding: '20px 40px',
        boxShadow: '0 4px 12px rgba(47, 79, 63, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '500',
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateX(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <Home size={20} />
            חזרה לדף הבית
          </Link>
          <h1 style={{
            color: '#ffffff',
            fontSize: '32px',
            margin: 0,
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            ארכיון מושב לבנים
          </h1>
        </div>
      </header>

      {/* סקשן ארכיון - תמונות */}
      <section id="archive-photos" style={{
        background: 'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)',
        padding: '80px 40px',
        minHeight: '400px',
        scrollMarginTop: '80px'
      }}>
        <h2 style={{
          color: '#2f4f3f',
          fontSize: '42px',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing: '1.5px',
          background: 'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          📷 ארכיון תמונות
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: num * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(47, 79, 63, 0.1)',
                textAlign: 'center',
                minHeight: '220px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                border: '2px solid rgba(47, 79, 63, 0.1)',
                transition: 'all 0.3s ease'
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
        background: 'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
        padding: '80px 40px',
        minHeight: '400px',
        scrollMarginTop: '80px'
      }}>
        <h2 style={{
          color: '#2f4f3f',
          fontSize: '42px',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing: '1.5px',
          background: 'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎥 ארכיון וידאו
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {[1, 2, 3, 4].map((num) => (
            <div key={num} style={{
              background: '#f9f9f9',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              textAlign: 'center',
              minHeight: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999'
            }}>
              סרטון {num}
            </div>
          ))}
        </div>
      </section>

      {/* סקשן ארכיון - כתבות */}
      <section id="archive-articles" style={{
        background: 'linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #fefcf8 100%)',
        padding: '80px 40px',
        minHeight: '400px',
        scrollMarginTop: '80px'
      }}>
        <h2 style={{
          color: '#2f4f3f',
          fontSize: '42px',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing: '1.5px',
          background: 'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          📰 ארכיון כתבות
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { title: "חגיגת יום העצמאות במושב", date: "15.05.2024" },
            { title: "פתיחת גן שעשועים חדש", date: "10.04.2024" },
            { title: "יום ניקיון קהילתי", date: "05.03.2024" },
            { title: "אירוע תרבות - ערב שירה", date: "20.02.2024" },
          ].map((article, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              borderRight: '4px solid #2f4f3f'
            }}>
              <h3 style={{ color: '#2f4f3f', margin: '0 0 10px 0' }}>{article.title}</h3>
              <p style={{ color: '#666', margin: 0 }}>📅 {article.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* סקשן ארכיון - לבנים ברשת */}
      <section id="archive-social" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fefcf8 50%, #faf8f3 100%)',
        padding: '80px 40px',
        minHeight: '400px',
        scrollMarginTop: '80px'
      }}>
        <h2 style={{
          color: '#2f4f3f',
          fontSize: '42px',
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 3px 8px rgba(139, 195, 74, 0.2), 0 1px 3px rgba(0,0,0,0.1)',
          letterSpacing: '1.5px',
          background: 'linear-gradient(135deg, #2f4f3f 0%, #4a7c59 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🌐 לבנים ברשת
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { platform: "פייסבוק", link: "facebook.com/levavim" },
            { platform: "אינסטגרם", link: "instagram.com/levavim" },
            { platform: "טוויטר", link: "twitter.com/levavim" },
            { platform: "יוטיוב", link: "youtube.com/levavim" },
          ].map((social, index) => (
            <div key={index} style={{
              background: '#f9f9f9',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2f4f3f', margin: '0 0 10px 0' }}>{social.platform}</h3>
              <p style={{ color: '#666', margin: 0 }}>{social.link}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
