import styled, { css } from 'styled-components'

interface SearchBarResultProps {
  $isActive: boolean
}

export const SearchBarContainer = styled.div`
  width: min(100%, 48rem);
  margin: 0 auto;
  position: relative;
`

export const SearchBarLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.textStrong};
  font-size: 0.95rem;
  font-weight: 600;
`

export const SearchBarRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.85rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export const SearchBarInputWrap = styled.div`
  position: relative;
`

export const SearchBarInput = styled.input`
  width: 100%;
  min-height: 4rem;
  padding: 0 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.95);
  box-shadow: ${({ theme }) => theme.shadows.field};
  color: ${({ theme }) => theme.colors.textStrong};
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadows.fieldActive};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 3.6rem;
  }
`

export const SearchBarButton = styled.button`
  min-height: 4rem;
  padding: 0 1.6rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentStrong}
  );
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.button};
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.buttonActive};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 3.6rem;
  }
`

export const SearchBarPanel = styled.div`
  margin-top: 1rem;
  padding: 0.7rem;
  border: 1px solid rgba(124, 90, 214, 0.14);
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(255, 255, 255, 0.97);
  box-shadow: ${({ theme }) => theme.shadows.popover};
  backdrop-filter: blur(18px);
`

export const SearchBarResults = styled.ul`
  display: grid;
  gap: 0.35rem;
  list-style: none;
`

export const SearchBarResult = styled.button<SearchBarResultProps>`
  width: 100%;
  padding: 0.95rem 1rem;
  border: 0;
  border-radius: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.textStrong};
  text-align: left;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background: rgba(123, 91, 214, 0.1);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: rgba(123, 91, 214, 0.1);
    `}

  mark {
    background: rgba(172, 145, 244, 0.32);
    color: inherit;
    border-radius: 0.3rem;
    padding: 0.05rem 0.2rem;
  }
`

export const SearchBarState = styled.p`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`