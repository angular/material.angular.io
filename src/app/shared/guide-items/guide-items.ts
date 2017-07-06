import {Injectable} from '@angular/core';

export interface GuideItem {
  id: string;
  name: string;
  document: string;
}

const GUIDES = [
  {
    id: 'getting-started',
    name: 'Getting started',
    document: '/assets/documents/guides/getting-started.html',
  },
  {
    id: 'theming',
    name: 'Theming Angular Material',
    document: '/assets/documents/guides/theming.html',
  },
  {
    id: 'theming-your-components',
    name: 'Theming your own components',
    document: '/assets/documents/guides/theming-your-components.html',
  },
  {
    id: 'typography',
    name: `Using Angular Material's Typography`,
    document: '/assets/documents/guides/typography.html',
  },
  {
    id: 'cdk-table',
    name: `CDK data-table`,
    document: '/assets/documents/guides/cdk-table.html',
  },
];

@Injectable()
export class GuideItems {

  getAllItems(): GuideItem[] {
    return GUIDES;
  }

  getItemById(id: string): GuideItem {
    return GUIDES.find(i => i.id === id);
  }
}
