import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { Auth0LoginComponent } from './auth0-login.component';

describe('Auth0LoginComponent', () => {
  let component: Auth0LoginComponent;
  let fixture: ComponentFixture<Auth0LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthModule.forRoot({
          ...env.auth,
        }),
      ],
      declarations: [ Auth0LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth0LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
