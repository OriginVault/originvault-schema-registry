declare module '@originvault/ov-id-viewer' {
  export interface OVIdViewerProps {
    did: string;
    render: (options: any) => React.ReactNode;
  }
  
  export const OVIdViewer: React.FC<OVIdViewerProps>;
} 