import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemAnalyticsView } from "./system-analytics-view";

@Injectable()
export class SystemAnalyticsService {
    constructor(
        @InjectRepository(SystemAnalyticsView)
        private readonly systemAnalyticsRepository: Repository<SystemAnalyticsView>,
    ) {}

    async getAnalytics(): Promise<SystemAnalyticsView> {
        const analytics = await this.systemAnalyticsRepository.find();
        return analytics[0];
    }
}
