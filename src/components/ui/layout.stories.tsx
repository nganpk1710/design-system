import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./box";
import { Stack } from "./stack";
import { Inline } from "./inline";

const meta: Meta = { title: "Layout/Box, Stack, Inline", parameters: { layout: "padded" } };
export default meta;

const SIZES = ["none", "xxs", "xs", "sm", "md", "lg", "xl"] as const;
const Item = ({ w = "w-24" }: { w?: string }) => <div className={`h-8 bg-bg-primary ${w}`} />;

export const BoxPadding: StoryObj = {
  render: () => (
    <Inline space="md" shouldWrap>
      {SIZES.map((s) => (
        <Box key={s} padding={s} background="accent">
          <span className="type-small-md">inset/{s}</span>
        </Box>
      ))}
    </Inline>
  ),
};
export const BoxBackground: StoryObj = {
  render: () => (
    <Inline space="md" shouldWrap>
      {(["none", "surface", "primary", "accent", "red"] as const).map((b) => (
        <Box key={b} padding="md" background={b}>
          <span className="type-small-md">{b}</span>
        </Box>
      ))}
    </Inline>
  ),
};
export const StackSpace: StoryObj = {
  render: () => (
    <Inline space="xl" shouldWrap>
      {SIZES.map((s) => (
        <Stack key={s} space={s}>
          <Item />
          <Item w="w-16" />
          <Item w="w-20" />
        </Stack>
      ))}
    </Inline>
  ),
};
export const StackAlign: StoryObj = {
  render: () => (
    <Inline space="xl">
      {(["start", "center", "end"] as const).map((a) => (
        <Stack key={a} align={a} className="w-40">
          <Item />
          <Item w="w-16" />
        </Stack>
      ))}
    </Inline>
  ),
};
export const InlineSpaceAndWrap: StoryObj = {
  render: () => (
    <Stack space="lg">
      {SIZES.map((s) => (
        <Inline key={s} space={s} align="center">
          <Item w="w-14" />
          <Item w="w-14" />
          <Item w="w-14" />
        </Inline>
      ))}
      <Inline space="md" shouldWrap className="w-48">
        {Array.from({ length: 6 }, (_, i) => <Item key={i} w="w-14" />)}
      </Inline>
    </Stack>
  ),
};
