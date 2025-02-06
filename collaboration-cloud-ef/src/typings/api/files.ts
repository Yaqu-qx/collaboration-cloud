export interface IFile {
    id: string;
    title: string;
    size?: number;
    createrAvatar: string;
    createrName: string;
    key: string;
    latestModifiedTime: string;
    latestModifier: string;
    isStarred: boolean;
    isFilefolder: boolean;
  }