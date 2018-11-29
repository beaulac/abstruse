import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntegrationService } from '../shared/integration.service';

@Component({
  selector: 'app-settings-integration-details',
  templateUrl: './settings-integration-details.component.html',
  styleUrls: ['./settings-integration-details.component.sass']
})
export class SettingsIntegrationDetailsComponent implements OnInit {
  integrationID: number;
  fetchingIntegration: boolean;
  i: any;
  processing: boolean;
  fetchingRepositories: boolean;
  repositories: any[];

  constructor(
    public integration: IntegrationService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.integrationID = this.route.snapshot.params.id;
    this.processing = false;
    this.i = null;
    this.fetchingRepositories = false;
    this.repositories = [];
    this.fetchIntegration();
  }

  update(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.processing = true;
    this.integration.updateIntegration(this.integrationID).subscribe(resp => {
      if (resp && resp.data) {
        this.fetchIntegration();
      }
    }, err => {
      console.error(err);
    }, () => {
      this.processing = false;
    });
  }

  fetchIntegration(): void {
    this.fetchingIntegration = true;
    this.integration.fetchIntegration(this.integrationID).subscribe(resp => {
      if (resp && resp.data) {
        this.i = resp.data;
        this.fetchRepos();
      }
    }, err => {
      console.error(err);
    }, () => {
      this.fetchingIntegration = false;
    });
  }

  fetchRepos(): void {
    this.fetchingRepositories = true;
    this.integration.fetchIntegrationRepos(this.integrationID).subscribe(resp => {
      if (resp && resp.data) {
        this.repositories = resp.data;
        console.log(this.repositories);
      }
    }, err => {
      console.error(err);
    }, () => {
      this.fetchingRepositories = false;
    });
  }
}
