import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  getTeam() {
    return [
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/11967501?v=4',
        name: 'Robert Santos',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: 'https://www.facebook.com/robertsanseries',
            twitter: 'https://twitter.com/robertsanseries',
            github: 'https://github.com/robertsanseries',
            linkedin: 'https://www.linkedin.com/in/robertsanseries',
            telegram: 'https://t.me/robertsanseries'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/828559?v=4',
        name: 'Leonardo Lemos',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: 'https://www.facebook.com/leonard0lemos',
            twitter: '',
            github: 'https://github.com/leonardo-lemos',
            linkedin: '',
            telegram: 'https://t.me/leonardolemos'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/12532760?v=4',
        name: 'Fernando da Silva',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: '',
            twitter: '',
            github: 'https://github.com/naaando',
            linkedin: '',
            telegram: 'https://t.me/naaando'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/2482730?v=4',
        name: 'Pablo R. Dinella',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: 'https://www.facebook.com/pablordinella/',
            twitter: '',
            github: 'https://github.com/PabloDinella',
            linkedin: '',
            telegram: 'https://t.me/PabloDinella'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/5933675?v=4',
        name: 'Haruno Kenobi',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: '',
            twitter: '',
            github: 'https://github.com/HarunoKenobi',
            linkedin: '',
            telegram: 'https://t.me/HarunoKenobi'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/995134?v=4',
        name: 'Lucas Dillmann',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: '',
            twitter: '',
            github: 'https://github.com/lucasdillmann',
            linkedin: '',
            telegram: 'https://t.me/LucasDillmann'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/4886639?v=4',
        name: 'Paulo Galardi',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: '',
            twitter: '',
            github: 'https://github.com/lainsce',
            linkedin: '',
            telegram: 'https://t.me/lainsdev'
          }
        ]
      },
      {
        urlPhoto: 'https://avatars.githubusercontent.com/u/4334406?v=4',
        name: 'Carlos Gomes',
        bio: 'Desenvolvedor',
        icons: [
          {
            facebook: '',
            twitter: '',
            github: 'https://github.com/cjgomes',
            linkedin: '',
            telegram: 'https://t.me/cjg0m3s'
          }
        ]
      }
    ];
  }
}
