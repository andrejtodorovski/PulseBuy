import { Controller, Get } from '@nestjs/common';
import { SystemAnalyticsService } from './system-analytics.service';
import { SystemAnalyticsView } from "./system-analytics-view";

@Controller('system-analytics')
export class SystemAnalyticsController {
    constructor(private readonly systemAnalyticsService: SystemAnalyticsService) {
    }

    @Get()
    async getSystemAnalytics(): Promise<SystemAnalyticsView> {
        return await this.systemAnalyticsService.getAnalytics();
    }
}
