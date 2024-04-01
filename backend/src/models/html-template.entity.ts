import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {HtmlTemplateContext} from "./html-template-context.enum";

@Entity({name: 'html_templates'})
export class HtmlTemplate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventClassName: string;

    @Column()
    subject: string;

    @Column()
    body: string;

    @Column({
        type: 'enum',
        enum: HtmlTemplateContext
    })
    context: HtmlTemplateContext;
}
