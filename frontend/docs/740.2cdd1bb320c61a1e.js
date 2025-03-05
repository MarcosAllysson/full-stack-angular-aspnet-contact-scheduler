"use strict";(self.webpackChunksakai_ng=self.webpackChunksakai_ng||[]).push([[740],{4740:(P,i,t)=>{t.r(i),t.d(i,{ForgotPasswordComponent:()=>u});var n=t(95),c=t(6814),o=t(5849),d=t(3132),m=t(5219),_=t(707),f=t(7018),l=t(304);function p(r,M){1&r&&(o.TgZ(0,"div",9),o._uU(1," Email inv\xe1lido. "),o.qZA())}let u=(()=>{class r{constructor(){this._fb=(0,o.f3M)(n.qu),this._authService=(0,o.f3M)(l.e),this._router=(0,o.f3M)(d.F0),this._messageService=(0,o.f3M)(m.ez)}ngOnInit(){this.forgotForm=this._fb.group({email:["",[n.kI.required,n.kI.email]]})}recoverPassword(){if(this.forgotForm.valid){const{email:g}=this.forgotForm.value;this._authService.forgotPassword(g).subscribe({next:()=>{this._messageService.add({severity:"success",summary:"Recupera\xe7\xe3o de Senha",detail:"Se este email estiver cadastrado, voc\xea receber\xe1 um link para redefinir a senha."}),this._router.navigate(["/auth/login"])},error:()=>{this._messageService.add({severity:"error",summary:"Erro",detail:"Erro ao tentar recuperar a senha."})}})}else this.forgotForm.markAllAsTouched()}static#o=this.\u0275fac=function(s){return new(s||r)};static#n=this.\u0275cmp=o.Xpm({type:r,selectors:[["app-forgot-password"]],standalone:!0,features:[o._Bn([m.ez]),o.jDz],decls:15,vars:3,consts:[[1,"forgot-password-container"],[1,"forgot-password-form",3,"formGroup","ngSubmit"],[1,"form-group"],["for","email"],["type","email","id","email","formControlName","email","placeholder","Digite seu email"],["class","error-message",4,"ngIf"],["type","submit",3,"disabled"],[1,"form-links"],["routerLink","/auth/login"],[1,"error-message"]],template:function(s,e){if(1&s&&(o.TgZ(0,"div",0),o._UZ(1,"p-toast"),o.TgZ(2,"form",1),o.NdJ("ngSubmit",function(){return e.recoverPassword()}),o.TgZ(3,"h2"),o._uU(4,"Recuperar Senha"),o.qZA(),o.TgZ(5,"div",2)(6,"label",3),o._uU(7,"Email"),o.qZA(),o._UZ(8,"input",4),o.YNc(9,p,2,0,"div",5),o.qZA(),o.TgZ(10,"button",6),o._uU(11," Recuperar Senha "),o.qZA(),o.TgZ(12,"div",7)(13,"a",8),o._uU(14,"Voltar para Login."),o.qZA()()()()),2&s){let a;o.xp6(2),o.Q6J("formGroup",e.forgotForm),o.xp6(7),o.Q6J("ngIf",(null==(a=e.forgotForm.get("email"))?null:a.invalid)&&(null==(a=e.forgotForm.get("email"))?null:a.touched)),o.xp6(1),o.Q6J("disabled",e.forgotForm.invalid)}},dependencies:[c.ez,c.O5,n.u5,n._Y,n.Fj,n.JJ,n.JL,_.hJ,n.UX,n.sg,n.u,d.rH,f.EV,f.FN],styles:[".forgot-password-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f4f7f9}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]{background:#fff;padding:2rem;border-radius:8px;box-shadow:0 2px 8px #0000001a;width:100%;max-width:400px}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{text-align:center;margin-bottom:1.5rem}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:1rem}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:block;margin-bottom:.5rem}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:.75rem;border:1px solid #ccc;border-radius:4px}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#007ad9}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .error-message[_ngcontent-%COMP%]{color:#e74c3c;font-size:.875rem;margin-top:.5rem}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;padding:.75rem;background:#007ad9;border:none;border-radius:4px;color:#fff;font-size:1rem;cursor:pointer}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled{background:#a0c4e3;cursor:not-allowed}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-links[_ngcontent-%COMP%]{margin-top:1rem;display:flex;justify-content:space-between}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#007ad9;text-decoration:none}.forgot-password-container[_ngcontent-%COMP%]   .forgot-password-form[_ngcontent-%COMP%]   .form-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]})}return r})()}}]);