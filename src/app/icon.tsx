import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '24px',
          background: 'linear-gradient(to right, #FF7F50, #FF6347)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        H
      </div>
    ),
    {
      ...size,
    }
  );
}
