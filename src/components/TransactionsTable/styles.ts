import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: center;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      text-align: center;
      color: var(--text-body);
      border-radius: 0.25rem;

      // Encontra o primeiro [td] e aplica essa cor
      &:first-child {
        color: #000;
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      &:last-child {
        padding: 0;

        &:hover {
          filter: brightness(0.9);
        }
        transition: filter 0.2s;
      }

      button[type='button'] {
        width: 100%;
        background: transparent;
        color: var(--text-title);
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;

        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          filter: brightness(0.9);
        }
        transition: filter 0.2s;
      }
    }
  }
`;
