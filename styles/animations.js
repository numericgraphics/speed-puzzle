import { keyframes } from '@mui/material'

// source : https://github.com/animate-css/animate.css/tree/main/source

export const InDown = keyframes`
  from {
    transform: translate3d(0, -100%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }`

export const rotateIn = keyframes`
  from {
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }`

export const bounceIn = keyframes`
from,
20%,
40%,
60%,
80%,
to {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

0% {
  opacity: 0;
  transform: scale3d(0.3, 0.3, 0.3);
}

20% {
  transform: scale3d(1.1, 1.1, 1.1);
}

40% {
  transform: scale3d(0.9, 0.9, 0.9);
}

60% {
  opacity: 1;
  transform: scale3d(1.03, 1.03, 1.03);
}

80% {
  transform: scale3d(0.97, 0.97, 0.97);
}

to {
  opacity: 1;
  transform: scale3d(1, 1, 1);
}
`

export const bounceOut = keyframes`
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
`

export const fadeInUp = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`

export const fadeOutDown = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`
export const spinColor = keyframes`
  0%   {background: red;}
  100% {background: yellow;}
  from {
    opacity: 0;
    transform:rotate(0deg) scale(0)
  }
  to {
    opacity: 1;
    transform:rotate(-360deg) scale(5)
  }
`
export const spinColorRevered = keyframes`
  0%   {background: yellow}
  100% {background: red}
  from {
    opacity: 1;
    transform:rotate(-360deg) scale(5)
  }
  to {
    opacity: 0;
    transform:rotate(0deg) scale(0)
  }
`