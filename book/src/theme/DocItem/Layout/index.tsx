import React, { type ReactNode } from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';

import DocActions from '@site/src/components/DocActions';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  const children: any = props.children;
  const docId = children?.props?.metadata?.id || 'doc';

  return (
    <>
      <DocActions
        content="[Chapter Content]"
        docId={docId}
      />
      <Layout {...props} />
    </>
  );
}
