import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { distinctUntilChanged, first } from 'rxjs/operators';
import { ApiErrorFormattingService, AuthService, CountryService, FormService, LanguageService, SweetAlertService, TypeDocumentService, UserService } from 'src/app/core/services';
import { CountryList, UserPersonSignup } from 'src/app/core/models';
import { Subscription } from 'rxjs';
import { ResponseApi, TypeDocumentList } from 'src/app/core/models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  submitted:boolean = false;
  error:any = '';
  successmsg:boolean = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // Tipo documentos
  listDocuments?: TypeDocumentList[];

  // Paises
  listCountries?: CountryList[];

  private subscription: Subscription = new Subscription();

  // tslint:disable-next-line: max-line-length
  constructor(
    public languageService: LanguageService,
    private cookieService: CookieService,
    private _typeDocumentService: TypeDocumentService,
    private _countryService: CountryService,
    private _authService: AuthService,
    private _userService: UserService,
    private _formService: FormService,
    private _apiErrorFormattingService: ApiErrorFormattingService,
    private _sweetAlertService: SweetAlertService,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router) 
  { 
    this.languageService.setLanguage('es');
  }

  ngOnInit() {
    this.initForm();
    this.apiTypeDocumentList();
    // this.apiCountryList();

    // Tipo de documentosl
    this.subscription.add(
      this._typeDocumentService.typeDocuments$
      .pipe(distinctUntilChanged())
          .subscribe((list: TypeDocumentList[]) => {
            this.listDocuments = list;
      })
    );

    // Países
    // this.subscription.add(
    //   this._countryService.listObserver$
    //   .pipe(distinctUntilChanged())
    //   .pipe(
    //     distinctUntilChanged((prevList, currentList) =>
    //         prevList.map(item => item.id).join(',') === currentList.map(item => item.id).join(',')
    //         )
    //       )
    //       .subscribe((list: CountryList[]) => {
    //         this.listCountries = list;
    //   })
    // );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * ****************************************************************
   * OPERACIONES CON LA API
   * ****************************************************************
   */
  private saveDataApi(data: UserPersonSignup){
    this._sweetAlertService.loadingUp()
    this.subscription.add(
      this._userService.register(data).subscribe((response: ResponseApi) => {
        this._sweetAlertService.stop();
        if(response.code == 201){
          if(response.data){
            const {person, user} = response.data;
            if(user){
              const token_auth = user.token_auth;
  
              const dataUser = {user: user.data, person: person};
              localStorage.setItem('dataUser', JSON.stringify(dataUser));
    
              if(token_auth){  
                this.cookieService.set('token_auth', token_auth);
              }
            }
          }
          this.router.navigate(['/main']);
        }

        if(response.code == 422){
          if(response.errors){
            const {user_errors, person_errors} = response.errors;
            let textErrors = '';

            if(person_errors){
              textErrors += this._apiErrorFormattingService.formatAsHtml(person_errors);
            }

            if(user_errors){
              textErrors += this._apiErrorFormattingService.formatAsHtml(user_errors);
            }

            if(textErrors != ''){
              this._sweetAlertService.showTopEnd({type: 'error', title: response.message, message: textErrors});
            }

          }
        }

        if(response.code == 500){
          if(response.errors){
            this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
          }
        }
      }, (error) => {
        this._sweetAlertService.stop();
        console.log(error);
      })
    )
  }

  // Tipo documento
  public apiAuthCreateAccount(data: any){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._authService.createAccount(data).subscribe((response: any) => {
      this._sweetAlertService.stop();
      if(response.code == 201){
        const result = response.data;
        const {access_token, user} = result
        console.log(result)

        const dataUser = {user: user, person: user.personId};
        localStorage.setItem('dataUser', JSON.stringify(dataUser));

        if(access_token){  
          this.cookieService.set('token_auth', access_token);
        }

        this.router.navigate(['/main']);
      }

      if(response.code == 400 || response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }
  


  /**
   * OPERACIONES DE TABLAS FORÁNEAS
   */
  // Tipo documento
  public apiTypeDocumentList(forceRefresh: boolean = false){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._typeDocumentService.getAll(forceRefresh).subscribe((response: any) => {
      this._sweetAlertService.stop();
      this.listDocuments = response;
      if(response.code == 200){
        this.listDocuments = response.data;
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }
  
  // Países
  public apiCountryList(forceRefresh: boolean = false){
    this._sweetAlertService.loadingUp('Obteniendo datos')
    this._countryService.getAll(forceRefresh).subscribe((response: ResponseApi) => {
      this._sweetAlertService.stop();
      if(response.code == 200){
        this.listCountries = response.data;
      }

      if(response.code == 500){
        if(response.errors){
          this._sweetAlertService.showTopEnd({type: 'error', title: response.errors?.message, message: response.errors?.error});
        }
      }
    }, (error: any) => {
      this._sweetAlertService.stop();
      console.log(error);
    });
  }
  


  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  
  /**
   * INICIAR FORMULARTO CON LAS VALIDACIONES
   * @param model 
   */
  private initForm(){
    const userPersonSignup = new UserPersonSignup();
    const formGroupData = this.getFormGroupData(userPersonSignup);
    this.signupForm = this.formBuilder.group(formGroupData);
  }

  /**
   * CREAR VALIDACIONES DEL FORMGROUP
   * @param model 
   * @returns 
   */
  private getFormGroupData(model: UserPersonSignup): object {
    return {
      ...this._formService.modelToFormGroupData(model),
      nombres: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      apellidoPaterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellidoMaterno: ['', [Validators.required, Validators.maxLength(50)]],
      typeDocumentId: ['', [Validators.required, Validators.min(1)]],
      nroDocumento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]],
      genero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1) ]],
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[^\s]+$/)]],
      clave: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      clave_confirmation: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
    }
  }


  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this._sweetAlertService.showTopEnd({title: 'Validación de datos', message: 'Campos obligatorios vacíos', type: 'warning', timer: 1500});
      return;
    } else {
      const values: any = this.signupForm.value;
      console.log(values)
      
      // VALIDAR CLAVE DE CONFIRMACIÓN
      if(values.clave != values.clave_confirmation){
        this._sweetAlertService.showTopEnd({title: 'Validación de datos', message: 'La contraseñas no coinciden', type: 'warning', timer: 1500});
        return
      }

      this._sweetAlertService.showConfirmationAlert('¿Estas seguro de registrar su cuenta de usuario?').then((confirm) => {
        if(confirm.isConfirmed){
          this.apiAuthCreateAccount(values);
        }
      });
    }
  }
}
