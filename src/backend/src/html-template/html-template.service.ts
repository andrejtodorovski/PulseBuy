import {Injectable} from '@nestjs/common';
import {HtmlTemplate} from "../models/html-template.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {HtmlTemplateContext} from "../models/html-template-context.enum";

@Injectable()
export class HtmlTemplateService {
    constructor(@InjectRepository(HtmlTemplate) private htmlTemplateRepository: Repository<HtmlTemplate>) {
    }

    findByEventClassNameAndContext(eventClassName: string, context: HtmlTemplateContext): Promise<HtmlTemplate> {
        return this.htmlTemplateRepository.findOne({
            where: {
                eventClassName: eventClassName,
                context: context
            }
        });
    }

    async existsByEventClassNameAndContext(eventClassName: string, context: HtmlTemplateContext): Promise<boolean> {
        const count = await this.htmlTemplateRepository.count({
            where: {
                eventClassName: eventClassName,
                context: context
            }
        });
        return count > 0;
    }
}
