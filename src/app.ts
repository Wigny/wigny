import { readFileSync, createWriteStream } from 'fs';
import { Repositories, Repository } from './repository.model';
import axios from 'axios';
import moment from 'moment';
import path from 'path';

const input = path.join(__dirname, '..', 'static.md');
const output = path.join(__dirname, '..', 'README.md');

const years = moment()
  .diff(moment([2001, 2, 26]), 'years')
  .toString();

const base = readFileSync(input, 'utf8')
  .replace('$years', years);

const today = moment()
  .locale('pt-BR')
  .format('LL');

const repositories = () => axios
  .get<Repositories>('https://api.github.com/users/Wigny/repos')
  .then(({ data }) => data);

const take = (repos: Repositories) => repos
  .sort((a, b) => a.updated_at < b.updated_at ? 1 : b.updated_at < a.updated_at ? -1 : 0)
  .slice(0, 5);

const write = (repos: Repositories) => {
  const stream = createWriteStream(output);

  const line = (repo: Repository) => stream.write(`- **[${repo.name}](${repo.html_url})**\n`);

  stream.once('open', () => {
    stream.write(base);

    repos.forEach(line);
    stream.write('\n');

    stream.write(`Atualizado última vez em ${today} com mágica.`)
    stream.end();
  });
}

repositories()
  .then(take)
  .then(write);
