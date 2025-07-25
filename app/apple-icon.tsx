import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 180,
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff00',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 旧电脑显示器 */}
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="#00ff00" strokeWidth="1" fill="none"/>
          {/* 显示器屏幕 */}
          <rect x="4" y="5" width="16" height="10" fill="#001100"/>
          {/* 显示器底座 */}
          <rect x="10" y="17" width="4" height="2" fill="#00ff00"/>
          <rect x="9" y="19" width="6" height="1" fill="#00ff00"/>
          {/* 屏幕上的文字线条 */}
          <rect x="6" y="7" width="12" height="1" fill="#00ff00"/>
          <rect x="6" y="9" width="8" height="1" fill="#00ff00"/>
          <rect x="6" y="11" width="10" height="1" fill="#00ff00"/>
          <rect x="6" y="13" width="6" height="1" fill="#00ff00"/>
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
} 