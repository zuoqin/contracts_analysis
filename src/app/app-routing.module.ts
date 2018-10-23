import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchProductComponent }  from './components/search/product/search-product/search-product.component';
import { SearchSuppliersComponent } from './components/search/suppliers';
import { SearchComponent } from './components/search/search.component';
const routes: Routes = [
	{ 
		path: '', 
		redirectTo: 'search/product', 
		pathMatch: 'full'
	},
	{
		path: 'search', 
		component:SearchComponent,
		children:[
			{ 
				path: 'product', 
				component: SearchProductComponent,
			},
			{ 
				path: 'supplier', 
				component: SearchSuppliersComponent,
			},
			{ 
				path: 'spgz', 
				component: SearchProductComponent,
			},
		]
	},

	{ path: '**',  redirectTo: 'search/product' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [
		RouterModule
	],
})
export class AppRoutingModule { }
