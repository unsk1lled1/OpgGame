import { resolveQuestionScene } from '../data/sceneResolver';

export default function SceneBackground({ question, questionIndex }) {
  const scene = resolveQuestionScene(question, questionIndex);
  const imageUrl = scene.hasImage ? scene.image : null;

  return (
    <div className="scene-background">
      {/* Dynamic Base Gradient */}
      <div
        className="scene-bg-gradient"
        style={{ background: scene.gradient }}
      />

      {/* Photo Layer with smooth opacity crossfade */}
      <div
        className="scene-bg-image"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          opacity: imageUrl ? 0.26 : 0,
        }}
      />

      {/* Editorial Grid Lines */}
      <div className="scene-grid-overlay" />

      {/* Translucent Tint */}
      <div
        className="scene-bg-overlay"
        style={{
          backgroundColor: imageUrl ? 'rgba(247, 244, 237, 0.75)' : 'rgba(247, 244, 237, 0.42)',
        }}
      />

      {/* Decorative Atmosphere */}
      <div className="scene-decorative">
        {/* Large Latin Word */}
        <div className="scene-deco-word">
          {scene.latinWord}
        </div>

        {/* Latin Quote */}
        {scene.latinQuote && (
          <div className="scene-latin-quote">
            «{scene.latinQuote}»
          </div>
        )}

        {/* Floating Legal Symbols */}
        <span className="scene-deco-symbol sym-0">{scene.symbol || '§'}</span>
        <span className="scene-deco-symbol sym-1">⚖</span>
        <span className="scene-deco-symbol sym-2">✧</span>
        <span className="scene-deco-symbol sym-3">{scene.tag || 'LEX'}</span>

        {/* Decorative Grid Lines */}
        <div className="scene-deco-line vert-1" />
        <div className="scene-deco-line vert-2" />
        <div className="scene-deco-line horiz-1" />

        {/* Article indicator */}
        <span className="scene-article-num art-0">
          Ст. {question.id} · ОСНОВЫ ПРАВА
        </span>
      </div>
    </div>
  );
}
