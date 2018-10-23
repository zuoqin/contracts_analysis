import { Component, HostListener, OnInit } from '@angular/core';

/*Services */
import { ProductServices } from '@core';
/*Models*/
import { ProductSearch } from '@core';
@Component({
    selector:"category-product",
    templateUrl:"./category-product.component.html"
})
export class CategoryProductComponent implements OnInit{
    @HostListener('document:click', ['$event'])
    public documentClick(event): void {
        if(!event.target.closest(".catergory-select") && (this.isOpenSubcategory || this.isOpenProduct)){
            this.isOpenSubcategory = false;
            this.isOpenProduct = false;
        }
    }
    selectedProduct:ProductSearch;
    isOpenSubcategory:boolean = false;
    isOpenProduct:boolean = false;
    categories;
    selectedCategory;
    selectedSubCategory;

    constructor(
        private productServices:ProductServices
    ){

        this.productServices.SelectProductObservable
            .subscribe((selectedProduct)=>{
                this.selectedProduct = selectedProduct;
                this.getCategoriesTree()
            })
    }
    ngOnInit(){
    

    }

    getCategoriesTree(){
        this.productServices.getProductTree(this.selectedProduct.kpgz_id).subscribe(
            response => {
                this.categories = response.data.tree.subcategory;

                let path = response.data.path;
                // path.map((item,index)=>{
                //     console.log(item)
                //     console.log(index)
                // })
          

                this.selectedCategory = this.categories.filter(category=>category.kpgz_id==path[0])[0];
                //this.selectedCategory = response.data.tree.subcategory[0];
                this.selectedSubCategory =  this.selectedCategory.subcategory.filter(category=>category.kpgz_id==path[1])[0];
            },
            err => {
                console.log(err)
            }
        );
    }
    selectSubCategory(category){
        if(!category.is_group && !category.subcategory){
            this.selectProduct(category)
        }else{
            this.selectedSubCategory = category;
            this.selectedProduct = null;
            this.isOpenSubcategory = false;
            this.isOpenProduct = true;
        }
        // console.log(category)

    }
    selectProduct(product){
        this.selectedProduct = product;
        this.productServices.SearchByNewProductSubject.next(this.selectedProduct)
        this.isOpenProduct = false;
    }
    openSubCategories(){
        this.isOpenSubcategory=true;
        this.isOpenProduct = false;
    }
    openProducts(){
        this.isOpenSubcategory=false;
        this.isOpenProduct=true;
    }
}
