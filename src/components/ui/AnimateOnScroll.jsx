import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimateOnScroll — wraps children and fires a CSS animation class
 * when the element enters the viewport.
 *
 * Props:
 *   animation  – animation utility class (default: 'animate-fade-in')
 *   delay      – delay class e.g. 'delay-200' (optional)
 *   threshold  – intersection ratio 0-1 (default 0.12)
 *   className  – extra class names
 *   style      – inline style object
 *   tag        – wrapper element tag (default 'div')
 */
const AnimateOnScroll = ({
  children,
  animation = 'animate-fade-in',
  delay = '',
  threshold = 0.12,
  className = '',
  style = {},
  tag: Tag = 'div',
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const classes = [
    visible ? `${animation} ${delay}` : 'opacity-0',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ opacity: visible ? undefined : 0, ...style }}
    >
      {children}
    </Tag>
  );
};

export default AnimateOnScroll;
