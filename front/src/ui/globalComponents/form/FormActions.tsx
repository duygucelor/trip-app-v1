import styled from "styled-components";
import { ReactNode } from "react";

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export function FormActions({ children }: { children?: ReactNode }) {
  return <Buttons>{children}</Buttons>;
}
