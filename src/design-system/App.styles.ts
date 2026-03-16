import styled from 'styled-components'

export const AppShell = styled.main`
  min-height: 100vh;
  padding: 4rem 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-inline: 1rem;
  }
`

export const Backdrop = styled.div`
  position: absolute;
  width: 26rem;
  aspect-ratio: 1;
  border-radius: 999px;
  filter: blur(14px);
  opacity: 0.6;
`

export const BackdropLeft = styled(Backdrop)`
  top: 5%;
  left: -10%;
  background: radial-gradient(circle, rgba(184, 157, 255, 0.5), transparent 65%);
`

export const BackdropRight = styled(Backdrop)`
  right: -8%;
  bottom: 2%;
  background: radial-gradient(circle, rgba(116, 79, 214, 0.24), transparent 60%);
`

export const HeroPanel = styled.section`
  width: min(100%, 72rem);
  padding: clamp(2rem, 4vw, 4rem);
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.panelBg};
  box-shadow: ${({ theme }) => theme.shadows.panel};
  backdrop-filter: blur(24px);
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`

export const SelectionPanel = styled.section`
  width: min(100%, 72rem);
  padding: 1.5rem 1.6rem;
  border: 1px solid rgba(124, 90, 214, 0.12);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.82);
  box-shadow: ${({ theme }) => theme.shadows.panelSoft};
  backdrop-filter: blur(18px);
  position: relative;
  z-index: 1;

  h2 {
    margin-bottom: 0.35rem;
    font-size: clamp(1.35rem, 3vw, 1.9rem);
    line-height: 1.1;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.radii.md};
  }
`

export const SelectionLabel = styled.span`
  display: inline-block;
  margin-bottom: 0.7rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(124, 90, 214, 0.1);
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`

export const SelectionResultsList = styled.ul`
  margin-top: 0.9rem;
  padding-left: 1.2rem;
  color: ${({ theme }) => theme.colors.textStrong};
  list-style: disc;

  li + li {
    margin-top: 0.35rem;
  }
`

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(124, 90, 214, 0.1);
  color: ${({ theme }) => theme.colors.accentStrong};
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const HeroTitle = styled.h1`
  max-width: 12ch;
  font-size: clamp(2.8rem, 7vw, 5.25rem);
  line-height: 0.94;
  letter-spacing: -0.05em;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`

export const HeroCopy = styled.p`
  max-width: 44rem;
  margin: 1.3rem 0 2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.05rem;
`

export const HelperGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

export const HelperCard = styled.article`
  padding: 1.1rem 1.15rem;
  border: 1px solid rgba(124, 90, 214, 0.12);
  border-radius: 1.25rem;
  background: rgba(255, 255, 255, 0.7);

  h2 {
    margin-bottom: 0.35rem;
    font-size: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
  }
`