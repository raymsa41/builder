import type { Signal } from '@builder.io/mitosis';
import type {
  BuilderContextInterface,
  RegisteredComponents,
} from '../../../../context/types';
import { getBlockProperties } from '../../../../functions/get-block-properties';
import type { BuilderBlock } from '../../../../types/builder-block';
import type { PropsWithBuilderData } from '../../../../types/builder-props';
import type { InteractiveElementProps } from '../interactive-element.lite';

type ComponentOptions = PropsWithBuilderData<{
  [index: string]: any;
  attributes?: {
    [index: string]: any;
  };
}>;

export interface ComponentProps {
  componentRef: any;
  componentOptions: ComponentOptions;
  blockChildren: BuilderBlock[];
  context: Signal<BuilderContextInterface>;
  registeredComponents: RegisteredComponents;
  builderBlock: BuilderBlock;
  includeBlockProps: boolean;
  isInteractive: boolean | undefined;
}

export const getWrapperProps = ({
  componentOptions,
  builderBlock,
  context,
  componentRef,
  includeBlockProps,
  isInteractive,
  contextValue,
}: Omit<ComponentProps, 'blockChildren' | 'registeredComponents'> & {
  contextValue: BuilderContextInterface;
}) => {
  const interactiveElementProps: InteractiveElementProps = {
    Wrapper: componentRef,
    block: builderBlock,
    context,
    wrapperProps: componentOptions,
  };

  return isInteractive
    ? interactiveElementProps
    : {
        ...componentOptions,
        /**
         * If `noWrap` is set to `true`, then the block's props/attributes are provided to the
         * component itself directly. Otherwise, they are provided to the wrapper element.
         */
        ...(includeBlockProps
          ? {
              attributes: getBlockProperties({
                block: builderBlock,
                context: contextValue,
              }),
            }
          : {}),
      };
};
