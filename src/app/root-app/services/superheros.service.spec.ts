import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SuperherosService } from "./superheros.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { SuperherosI } from "../interfaces/superheros";
import { environment } from "src/environments/environment";

const listSuperHero: SuperherosI[]= [
    {
        id: "123e4567-e89b-12d3-a456-426655440002",
        name: "Spiderman",
        description: "Apodado el hombre araña, Peter Parker tras ser picado por una araña en un laboratorio adquiere superpoderes",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0I8xypw9ssz4LBRWZu-BzbSDhCuxzQKV8Q&usqp=CAU",
        powers: "Fuerza, velocidad, durabilidad, agilidad, sentidos, reflejos, coordinación, equilibrio y resistencia sobrehumanos",
        battle_numbers:  16
      },
      {
        id: "123e4567-e89b-12d3-a456-426655440003",
        name: "Ironman",
        description: "Tony Stark, genio, multimillonario, playboy y filántropo",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLw5ubh9p0hhOd-iDbSYiVFGf4oZ_bD2HCOg&usqp=CAU",
        powers:"Repulsores de energía y misiles de proyección. Regenerativo soporte vital.",
        battle_numbers: 69
      }
]

describe('SuperherosService', () => {

    let service: SuperherosService;
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SuperherosService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
    })

    beforeEach(() => {
        service = TestBed.inject(SuperherosService);
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterAll(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('get return super heros', () => {
        service.getAllSuperHeros().subscribe((response:SuperherosI[])=>{
          expect(response).toEqual(listSuperHero)
       });
       const req = httpMock.expectOne(environment.url)
       expect(req.request.method).toBe('GET')
       req.flush(listSuperHero)
       
    });

    it('get return one super heros by Id', () => {
        service.getSuperHeroById(listSuperHero[0].id!!).subscribe((response:SuperherosI)=>{
            expect(response).toEqual(listSuperHero[0])
         });

        const req = httpMock.expectOne(`${environment.url}/${listSuperHero[0].id}`)
        expect(req.request.method).toBe('GET')
        req.flush(listSuperHero[0])
    });

    it('create one super', () => {
        service.createSuperHeros(listSuperHero[0]).subscribe((response:SuperherosI) => {
           expect(response.name).toEqual(listSuperHero[0].name);
         });

        const req = httpMock.expectOne(environment.url, listSuperHero[0].id)
        expect(req.request.method).toBe('POST')
        req.flush(listSuperHero[0])
    });


    it('update one super', () => {
        service.updateSuperHeros(listSuperHero[0]).subscribe((response:SuperherosI) => {
           expect(response.name).toEqual(listSuperHero[0].name);
         });

        const req = httpMock.expectOne(`${environment.url}/${listSuperHero[0].id}`, listSuperHero[0].id)
        expect(req.request.method).toBe('PUT')
        req.flush(listSuperHero[0])
    });
});