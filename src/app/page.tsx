"use client";

import React, { useEffect, useState } from "react";
import { TextField, Box, Container, Grid, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DataGrid } from "@mui/x-data-grid";
import DotButton from "./components/campaign/DotButton";
import { Campaign } from "./models/Campaign";
import { CampaignStatuses, URLS } from "./constants/constant";

const Campaigns = () => {
  const [campaignList, setCampaignList] = useState<Array<Campaign>>([]);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getData = () => {
      fetch(URLS.CAMPAIGN_GET)
        .then((response) => response.json())
        .then((data: Array<Campaign>) => {
          // Normalize outlayer data
          const filteredData = data.filter((item) => {
            return (
              new Date(item.endDate).getTime() >
              new Date(item.startDate).getTime()
            );
          });
          setCampaignList(filteredData);
        });
    };

    return () => {
      getData();
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.AddCampaigns = function (data: Array<Campaign> = []) {
      // Normalize outlayer data
      const filteredData = data.filter((item) => {
        return (
          new Date(item.endDate).getTime() > new Date(item.startDate).getTime()
        );
      });

      const newCampaignList: Array<Campaign> = campaignList;
      filteredData.forEach((filteredCampaign: Campaign) => {
        const indexControl = campaignList.findIndex(
          (campaign: Campaign) => campaign.id === filteredCampaign.id
        );

        if (indexControl === -1) {
          newCampaignList.push(filteredCampaign);
        } else {
          newCampaignList[indexControl] = filteredCampaign;
        }
      });

      setCampaignList(newCampaignList);
    };
  }, []);

  const resetFilters = () => {
    setFilter("");
    setStartDate("");
    setEndDate("");
  };

  const filteredCampaigns = campaignList.filter((campaign) => {
    const startDateMatch =
      !startDate || new Date(campaign.startDate) >= new Date(startDate);
    const endDateMatch =
      !endDate || new Date(campaign.endDate) <= new Date(endDate);
    const nameMatch =
      !filter || campaign.name.toLowerCase().includes(filter.toLowerCase());

    return startDateMatch && endDateMatch && nameMatch;
  });

  const columns = [
    { field: "name", headerName: "Name", minWidth: 100, flex: 1 },
    { field: "startDate", headerName: "Start date", minWidth: 100, flex: 1 },
    { field: "endDate", headerName: "End date", minWidth: 100, flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      renderCell: (params: { row: { isActive: string } }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.row.isActive === CampaignStatuses.ACTIVE ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <HighlightOffIcon color="error" />
          )}
          {params.row.isActive}
        </div>
      ),
    },
    { field: "Budget", headerName: "Budget", minWidth: 100, flex: 1 },
  ].map((column) => ({
    ...column,
    sortable: false,
  }));

  const rows = filteredCampaigns.map((campaign) => ({
    ...campaign,
    isActive:
      new Date(campaign.startDate) <= new Date() &&
      new Date(campaign.endDate) >= new Date()
        ? "Active"
        : "Inactive",
  }));

  return (
    <Container>
      <Box my={2}>
        <Typography variant="h4">Campaigns</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <TextField
            label="Search by name"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginRight: "8px", marginBottom: "16px" }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Start Date"
            variant="outlined"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginRight: "8px", marginBottom: "16px" }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="End Date"
            variant="outlined"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginRight: "8px", marginBottom: "16px" }}
          />
        </Grid>

        <Grid item>
          <DotButton onButtonClick={resetFilters} />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", marginTop: 5 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default Campaigns;
