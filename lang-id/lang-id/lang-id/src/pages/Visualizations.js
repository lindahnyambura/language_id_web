import React, { useState } from 'react';
import { BarChart3, Globe, FileText, Hash, Smile, BookOpen, MessageSquare } from 'lucide-react';

function Visualizations() {
  const [modalImage, setModalImage] = useState(null);
  const visualizations = [
    {
      id: 1,
      title: 'Language Distribution',
      description: 'Is our dataset a linguistic melting pot, or does one language dominate?',
      image: '/images/language_distribution.png',
      icon: <Globe className="viz-placeholder-icon" />,
    },
    {
      id: 2,
      title: 'Topic Distribution by Language',
      description: 'Which languages are the storytellers of specific topics? Let’s find out!',
      image: '/images/topic_distribution_by_language.png',
      icon: <FileText className="viz-placeholder-icon" />,
    },
    {
      id: 3,
      title: 'Text Length Across Languages',
      description: 'Do some languages prefer brevity, while others embrace lengthy narratives?',
      image: '/images/text_length_across_languages.png',
      icon: <Hash className="viz-placeholder-icon" />,
    },
    {
      id: 4,
      title: 'Most Common Words - French',
      description: 'What are the signature words that paint the French language’s stories?',
      image: '/images/most_common_words_french.png',
      icon: <BookOpen className="viz-placeholder-icon" />,
    },
    {
      id: 5,
      title: 'Most Common Words - Yoruba',
      description: 'What are the signature words that paint the Yoruba language’s stories?',
      image: '/images/most_common_words_yoruba.png',
      icon: <BookOpen className="viz-placeholder-icon" />,
    },
    {
      id: 6,
      title: 'Most Common Words - Swahili',
      description: 'What are the signature words that paint the Swahili language’s stories?',
      image: '/images/most_common_words_swahili.png',
      icon: <BookOpen className="viz-placeholder-icon" />,
    },
    {
      id: 7,
      title: 'Topic Sentiment Analysis',
      description: 'Are some topics a beacon of positivity, while others carry a somber tone?',
      image: '/images/topic_sentiment_analysis.png',
      icon: <Smile className="viz-placeholder-icon" />,
    },
  ];

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="content-section">
      <h2 className="section-title">
        <BarChart3 className="section-icon" />
        Dataset Insights
      </h2>

      <div className="viz-grid">
        {visualizations.map((viz) => (
          <div key={viz.id} className="viz-card">
            <h3 className="viz-title">{viz.title}</h3>
            <p className="viz-description">{viz.description}</p>
            <div className="viz-placeholder" onClick={() => handleImageClick(viz.image)}>
              <img src={viz.image} alt={viz.title} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', cursor: 'pointer' }} />
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div className='modal' onClick={closeModal} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <img src={modalImage} alt="Modal Image" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
}

export default Visualizations;