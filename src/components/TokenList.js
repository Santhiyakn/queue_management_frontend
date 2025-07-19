import { Button, List, ListItem, Typography } from '@mui/material';

export default function TokenList({ tokens, onServe, onCancel }) {
  return (
    <>
      <Typography variant="h6">Tokens</Typography>
      <List>
        {tokens.map(token => (
          <ListItem key={token._id} divider>
            #{token.position} — {token.name} ({token.status})
            <Button onClick={() => onServe(token._id)}>Serve</Button>
            <Button onClick={() => onCancel(token._id)}>Cancel</Button>
          </ListItem>
        ))}
      </List>
    </>
  );
}
