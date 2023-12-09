package com.example.bulls.Service;

import com.example.bulls.DTO.*;
import com.example.bulls.Entity.MatchPost;
import com.example.bulls.Entity.Team;
import com.example.bulls.Entity.User;
import com.example.bulls.Exception.AlreadyRegisteredTeamException;
import com.example.bulls.Exception.AlreadyRegisteredUserException;
import com.example.bulls.Repository.MatchPostRepository;
import com.example.bulls.Repository.TeamRepository;
import com.example.bulls.Repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.bulls.Config.CustomUserDetails;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class TeamService {

    private TeamRepository teamRepository;
    private UserRepository userRepository;
    private MatchPostRepository matchPostRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, UserRepository userRepository, MatchPostRepository matchPostRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.matchPostRepository = matchPostRepository;
    }

    // 팀 등록
    @Transactional
    public boolean teamRegister(TeamRegisterDTO teamRegisterDTO) {
        // 인증되어있는 객체에서 userName가져오기
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String uid = userDetails.getUsername();
        Optional<User> optionalUser = userRepository.findByUid(uid);
        User user = optionalUser.get();

        Team team = new Team();
        team.setTeamName(teamRegisterDTO.getTeamName());
        team.setTeamIntroduce(teamRegisterDTO.getTeamIntroduce());
        team.setTeamArea(teamRegisterDTO.getTeamArea());
        team.setTeamPhone(teamRegisterDTO.getTeamPhone());
        team.setTeamCaptain(teamRegisterDTO.getTeamCaptain());
        team.setNickname(user.getNickname());

        // 중복 검증
        validateDuplicateTeam(team);

        teamRepository.save(team);

        team.addUser(user);

        log.info("저장 완료?");

        return true;
    }

    // 본인이 속한 팀 정보 반환
    public TeamInfoDTO teamInfo() {
        try {
            // 인증되어있는 객체에서 userName가져오기
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();
            Optional<User> optionalUser = userRepository.findByUid(uid);

            log.info(String.valueOf(userDetails));

            Optional<Team> team = teamRepository.findByNickname(optionalUser.get().getNickname());

            if (team.isPresent()) {
                return TeamInfoDTO.builder()
                        .teamName(team.get().getTeamName())
                        .teamArea(team.get().getTeamArea())
                        .teamIntroduce(team.get().getTeamIntroduce())
                        .teamCaptain(team.get().getTeamCaptain())
                        .teamPhone(team.get().getTeamPhone())
                        .build();
            } else {
                return null;
            }

        } catch (SecurityException e) {
            log.info(e.getMessage());
            return null;
        }
    }

    // 본인이 속한 팀 삭제
    @Transactional
    public String teamDelete() {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String uid = userDetails.getUsername();
            Optional<User> optionalUser = userRepository.findByUid(uid);

            Optional<Team> team = teamRepository.findByNickname(optionalUser.get().getNickname());
            teamRepository.delete(team.get());

            return "삭제 완료";
        } catch (SecurityException e) {
            log.info(e.getMessage());
            return null;
        }
    }

    // 팀 리스트 조회
    public List teamList() {
        List<Team> teams = teamRepository.findAll();
        if (teams.isEmpty()) {
            return null;
        }
        List<TeamListDTO> teamListDTO = new ArrayList<>();
        for(Team team : teams) {
            teamListDTO.add(TeamListDTO.builder()
                            .teamName(team.getTeamName())
                            .teamArea(team.getTeamArea())
                            .teamCaptain(team.getTeamCaptain())
                            .teamIntroduce(team.getTeamIntroduce())
                            .teamPhone(team.getTeamPhone())
                    .build());
        }
        return teamListDTO;
    }

    // 모든 게시판 조회
    public List<BoardListDTO> getAllBoard() {
        // 모든 데이터 매칭날짜 기준으로 오름차순 정렬
        List<MatchPost> matchPosts = matchPostRepository.findAll(Sort.by(Sort.Direction.ASC, "matchDate"));

        List<BoardListDTO> dtos = new ArrayList<>();
        for (MatchPost matchPost : matchPosts) {
            // 변환 및 리스트에 추가하는 로직...
            BoardListDTO boardListDTO = new BoardListDTO();

            boardListDTO.setId(matchPost.getId());
            boardListDTO.setMatchDate(matchPost.getMatchDate());
            boardListDTO.setMatchTime(matchPost.getMatchTime());
            boardListDTO.setPlace(matchPost.getPlace());
            boardListDTO.setMatchPlace(matchPost.getMatchPlace());
            boardListDTO.setNumPerson(matchPost.getNumPerson());
            boardListDTO.setMatchStatus(matchPost.getMatchStatus());
            boardListDTO.setLevel(matchPost.getLevel());
            boardListDTO.setCanParking(matchPost.getCanParking());
            boardListDTO.setMatchPrice(matchPost.getMatchPrice());
            boardListDTO.setNickname(matchPost.getNickname());

            dtos.add(boardListDTO);
        }
        return dtos;
    }

    // 게시판 세부 조회
    public Optional<MatchPost> getBoardDetail(Integer id) {
        Optional<MatchPost> match = matchPostRepository.findById(id);
        return match;
    }

    // 게시판 업데이트
    public ResponseEntity<MatchPost> updateBoard(
            Integer id, MatchDTO updateMatchDTO) {
        Optional<MatchPost> optionalMatchPost = matchPostRepository.findById(id);

        if (optionalMatchPost.isPresent()) {
            MatchPost matchPost = optionalMatchPost.get();

            matchPost.setMatchTime(updateMatchDTO.getMatchTime());
            matchPost.setMatchDate(updateMatchDTO.getMatchDate());
            matchPost.setPostTime(updateMatchDTO.getPostTime());
            matchPost.setPostDate(updateMatchDTO.getPostDate());
            matchPost.setPlace(updateMatchDTO.getPlace());
            matchPost.setMatchPlace(updateMatchDTO.getMatchPlace());
            matchPost.setLevel(updateMatchDTO.getLevel());
            matchPost.setMatchPrice(updateMatchDTO.getMatchPrice());
            matchPost.setNumPerson(updateMatchDTO.getNumPerson());
            matchPost.setCanParking(updateMatchDTO.getCanParking());
            matchPost.setMatchStatus(updateMatchDTO.getMatchStatus());
            matchPost.setMatchContact(updateMatchDTO.getMatchContact());
            matchPost.setMainText(updateMatchDTO.getMainText());

            MatchPost updatedMatchPost = matchPostRepository.save(matchPost);


            return ResponseEntity.ok(updatedMatchPost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 게시판 저장
    public Boolean savedBoard(MatchDTO matchDTO) {
        // 인증되어있는 객체에서 userName가져오기
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String uid = userDetails.getUsername();
        Optional<User> optionalUser = userRepository.findByUid(uid);

        matchDTO.setNickname(optionalUser.get().getNickname());
        MatchPost matchPost = matchDTO.toEntity();
        log.info("MatchDTO = " + matchDTO.toString());

        matchPostRepository.save(matchPost);
        return true;
    }

    // 게시판 삭제
    public void deleteBoard(Integer id) {
        matchPostRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 게시물이 없습니다." + id));
        matchPostRepository.deleteById(id);
    }

    // 매칭 마감
    public boolean matchFinished(Integer id) {
        MatchPost matchPost = matchPostRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("존재하지않는 게시물입니다." + id));

        if (matchPost.getMatchStatus().equals("매칭중")) {
            log.info("매칭 마감으로 변경");
            matchPost.setMatchStatus("매칭 마감");
        } else if (matchPost.getMatchStatus().equals("매칭 마감")) {
            log.info("매칭중으로 변경");
            matchPost.setMatchStatus("매칭중");
        }
        matchPostRepository.save(matchPost);
        return true;

    }

    // 중복회원 검증
    private void validateDuplicateTeam(Team team) {
        teamRepository.findByTeamName(team.getTeamName()).
                ifPresent(m -> {
                    throw new AlreadyRegisteredTeamException("이미 존재하는 팀입니다.");
                });
        teamRepository.findByNickname(team.getNickname()).
                ifPresent(m -> {
                    throw new AlreadyRegisteredUserException("이미 팀을 등록한 유저입니다.");
                });
    }
}
