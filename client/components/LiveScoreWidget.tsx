import { useEffect } from "react";

export const LiveScoreWidget = () => {
  useEffect(() => {
    // Load the SoccersAPI widget script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://ls.soccersapi.com/widget/res/w_default/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="my-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
      {/* LIVESCORE WIDGET SOCCERSAPI.COM */}
      <div id="ls-widget" data-w="w_default" className="livescore-widget"></div>
      {/* LIVESCORE WIDGET SOCCERSAPI.COM */}
    </div>
  );
};
