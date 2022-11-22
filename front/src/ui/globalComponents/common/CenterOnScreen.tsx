import styled from "styled-components";
import { ReactNode } from "react";

const CenterHorizontally = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const CenterVertically = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function CenterOnScreen({ children }: { children?: ReactNode }) {
  return (
    <CenterHorizontally>
      <CenterVertically>{children}</CenterVertically>
    </CenterHorizontally>
  );
}
