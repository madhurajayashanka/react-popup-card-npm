import React, { useEffect, useRef, useCallback, useState } from 'react';
import './Popup.css';

interface PopupProps {
  message?: string;
  title?: string;
  emoji?: string;
  afterNavigation?: () => void;
  buttonText?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  buttonColor?: string;
  buttonBgColor?: string;
  autoCloseOnOutsideClick?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  message = "Default message",
  title = "Default title",
  emoji = "✅",
  afterNavigation,
  buttonText = "OK",
  width = "300px",
  height = "200px",
  bgColor = "#ffffff",
  buttonColor = "#fff",
  buttonBgColor = "#0000ff",
  autoCloseOnOutsideClick = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (autoCloseOnOutsideClick) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (autoCloseOnOutsideClick) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [autoCloseOnOutsideClick, handleClickOutside]);

  const handleButtonClick = () => {
    if (afterNavigation) {
      afterNavigation();
    }
    setIsVisible(false);
  };

  const showPopup = () => setIsVisible(true);

  return (
    <>
      <button onClick={showPopup}>Show Popup</button>
      {isVisible && (
        <div className="popup-overlay">
          <div 
            className="popup-content" 
            style={{ width, height, backgroundColor: bgColor }} 
            ref={popupRef}
          >
            <div className="popup-header">
              <h2>{title}</h2>
            </div>
            <div className="popup-body">
              <span className="popup-emoji">{emoji}</span>
              <p className="popup-message">{message}</p>
            </div>
            <div className="popup-footer">
              <button 
                onClick={handleButtonClick} 
                style={{ color: buttonColor, backgroundColor: buttonBgColor }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
