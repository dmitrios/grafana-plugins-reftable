# grafana-plugins-reftable
Note: 
upcoming Grafana release added support for table column link style.

Example of Grafana table with link column style for navigation of tabular data between master-detail dashboards. Simply add link style for a chosen column and define the format for hyperlink in this table component configured in master dashboard. The link can be set for navigation to an external application or another dashboard.

Installation
1. Deploy content of /reftable/dist folder to /grafana/plugins/reftable/dist.

Example:

href="/dashboard/db/my_detal_dashboard?var-MyDetailId={0}&var-_interval=%24__auto_interval&from=now-1h&to=now" style="color: green;"title="{0}" target="_blank">{0}

The link in the above example points to “my_detail_dsahboard” where {0} will be rendered as value of cell for table column associated with link style.
