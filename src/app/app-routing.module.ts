import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PostPageComponent} from './post-page/post-page.component';
import {ErrorPageComponent} from './error-page/error-page.component';


const routes: Routes = [
  {
    // MainLayoutComponent === like a header
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'}, // redirectTo home-page when we go to the '' path
      {path: '', component: HomePageComponent},
      {path: 'post/:id', component: PostPageComponent}
      // {path: 'error', component: ErrorPageComponent},
      // {path: '**', redirectTo: 'error'}
    ]
  },
  {
    path: 'admin',
    // lazy loading
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      // all lazy loading pages load after main page
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
