import { Component } from '@angular/core';
import { Observable, of, map, take } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';


type ProductWithKey = { key: string, product: Product };

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
}
