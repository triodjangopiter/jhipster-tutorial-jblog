/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JblogTestModule } from '../../../test.module';
import { PostComponent } from '../../../../../../main/webapp/app/entities/post/post.component';
import { PostService } from '../../../../../../main/webapp/app/entities/post/post.service';
import { Post } from '../../../../../../main/webapp/app/entities/post/post.model';

describe('Component Tests', () => {

    describe('Post Management Component', () => {
        let comp: PostComponent;
        let fixture: ComponentFixture<PostComponent>;
        let service: PostService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JblogTestModule],
                declarations: [PostComponent],
                providers: [
                    PostService
                ]
            })
            .overrideTemplate(PostComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Post(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.posts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
