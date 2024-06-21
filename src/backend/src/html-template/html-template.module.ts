import {Module} from '@nestjs/common';
import {HtmlTemplateService} from './html-template.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HtmlTemplate} from "../models/html-template.entity";

@Module({
    imports: [TypeOrmModule.forFeature([HtmlTemplate])],
    providers: [HtmlTemplateService],
    exports: [HtmlTemplateService]
})
export class HtmlTemplateModule {
}
