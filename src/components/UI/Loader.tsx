import styled from "styled-components";

interface LoaderProps {
  size?: string,
  speed?: number,
  borderSize?: number,
  color?: string
}

interface SpinnerProps {
  $size?: string,
  $speed?: number,
  $borderSize?: number,
  $color?: string
}

const Loader = ({ size, speed, borderSize, color }: LoaderProps) => {
  return (
    <Spinner $size={size} $speed={speed} $borderSize={borderSize} $color={color} />
  )
}

const Spinner = styled.span<SpinnerProps>`
  aspect-ratio: 1/1;
  width: ${({ $size }) => $size ? $size : "20px"};
  border: ${({ $borderSize }) => $borderSize ? $borderSize : "5px"} solid ${({ $color }) => $color ? $color : "#fff"};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation ${({ $speed }) => $speed ? $speed : "1s"} linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Loader;
