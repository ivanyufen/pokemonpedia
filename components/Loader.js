/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
`

export default function Loader(){
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='h-full'>
      <div css={css`
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #a9a9a9; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: ${spin} 2s linear infinite;
      `} />
    </div>
  )
}