import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class ValidationProvider {

    constructor() {}

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Este campo é requerido!',
            'email': 'Este campo deve conter um e-mail válido!',
            'password': 'A senha deve contar no mínimo 6 caracteres!',
            'brtelephone': 'Este campo deve conter um telefone válido! (DDD) XXXX-XXXX',
            'passwordsMatch': 'As senhas não são iguais',
            'minlength': 'Este campo deve conter um telefone válido! (DD) XXXX-XXXX',
            'MatchPassword': 'As senhas devem ser iguais',
            'completName': 'Digite seu nome completo',
            'cpf': 'CPF inválido'
        };

        return config[validatorName];
    }

    static validarCPF(control) {	
        let cpf = control.value.replace(/[^\d]+/g,'');	
        if(cpf == '') return null;	
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return {'cpf': true};		
        // Valida 1o digito	
        let add = 0;	
        for (let i=0; i < 9; i ++)		
            add += parseInt(cpf.charAt(i)) * (10 - i);	
             let rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(cpf.charAt(9)))		
                return {'cpf': true};	
        // Valida 2o digito	
        add = 0;	
        for (let i = 0; i < 10; i ++)		
            add += parseInt(cpf.charAt(i)) * (11 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	
            rev = 0;	
        if (rev != parseInt(cpf.charAt(10)))
            return {'cpf': true};		
        return null;   
    }

    static password(control) {
        // {6,100}		   - Assert password is between 6 and 100 characters
        // (?=.*[0-9])	   - Assert a string has at least one number
        if (control.value === "" || control.value.length > 5) {//control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return {'password': true};
        }
    }

    static fullName(control) {
        let name = control.value.trim();
        if (name === "" || name.indexOf(" ") != -1) {
            return null;
        } else {
            return {'completName': true};
        }
    }

    static passwordsMatch(cg) {
        let pwd1 = cg.get('Password');
        let pwd2 = cg.get('confirmPassword');
        cg.get('confirmPassword').setErrors(null);
        if ((pwd1.value !='' || pwd2.value != '') && pwd1.value != pwd2.value) {
            cg.get('confirmPassword').setErrors( {'MatchPassword': true} )
            return {'MatchPassword': true};
        }
        return null;
    }
}