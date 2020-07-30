export type Repositories = Repository[];

export interface Repository {
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  fork: boolean;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  homepage?: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language?: string;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  forks: number;
  open_issues: number;
  watchers: number;
}
